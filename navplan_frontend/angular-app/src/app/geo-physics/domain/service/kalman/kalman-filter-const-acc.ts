import {inverse, Matrix} from 'ml-matrix';


export class KalmanFilterConstAcc {
    private state: Matrix;       // 3x1 [x, v, a]
    private covariance: Matrix;  // 3x3
    private H: Matrix;           // 1x3 (measurement matrix)
    private R: Matrix;           // 1x1 (measurement noise)
    private Q_base: Matrix;      // 3x3 (process noise)
    private I: Matrix;           // 3x3 identity


    constructor(
        initialState: { x: number; v: number; a: number } = {x: 0, v: 0, a: 0},
        measurementVariance: number = 1,
    ) {
        console.log('kalman constructor');
        this.state = new Matrix([[initialState.x], [initialState.v], [initialState.a]]); // initial state
        this.covariance = Matrix.eye(3);              // initial uncertainty
        this.H = new Matrix([[1, 0, 0]]);             // only measuring position
        this.R = new Matrix([[measurementVariance]]); // measurement variance (e.g. 1m^2)
        this.I = Matrix.eye(3);

        // Base process noise (can scale with dt)
        this.Q_base = new Matrix([
            [0.01, 0, 0],
            [0, 0.1, 0],
            [0, 0, 0.5]
        ]);
    }


    // Predict step using current state and variable time delta
    predict(dt: number) {
        const dt2 = 0.5 * dt * dt;

        const F = new Matrix([
            [1, dt, dt2],
            [0, 1, dt],
            [0, 0, 1]
        ]);

        this.state = F.mmul(this.state);
        this.covariance = F.mmul(this.covariance).mmul(F.transpose()).add(this.Q_base);
    }


    // Update step with a new position measurement (z)
    update(z: number) {
        const zMatrix = new Matrix([[z]]);
        const y = zMatrix.subtract(this.H.mmul(this.state)); // innovation
        const S = this.H.mmul(this.covariance).mmul(this.H.transpose()).add(this.R);
        const K = this.covariance.mmul(this.H.transpose()).mmul(inverse(S));

        this.state = this.state.add(K.mmul(y));
        this.covariance = this.I.subtract(K.mmul(this.H)).mmul(this.covariance);
    }


    getState(): { x: number; v: number; a: number } {
        return {
            x: this.state.get(0, 0),
            v: this.state.get(1, 0),
            a: this.state.get(2, 0)
        };
    }
}
