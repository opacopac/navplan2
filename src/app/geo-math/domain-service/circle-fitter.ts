/**
 * original source code in JS: https://github.com/Meakk/circle-fit
 */


export interface CifiPoint {
    x: number;
    y: number;
}


export interface CifiResult {
    points: CifiPoint[];
    projections: CifiPoint[];
    distances: number[];
    success: boolean;
    center: CifiPoint;
    radius: number;
    residue: number;
    computationTime: number;
}


export class CircleFitter {
    private points: CifiPoint[] = [];


    public addPoint(x: number, y: number) {
        this.points.push({x: x, y: y});
    }


    public resetPoints() {
        this.points = [];
    }


    public compute(): CifiResult {
        const result: CifiResult = {
            points: this.points,
            projections: [],
            distances: [],
            success: false,
            center: {x: 0, y: 0},
            radius: 0,
            residue: 0,
            computationTime: performance.now()
        };

        const m = this.calcMeans();
        const u = this.calcCenteredPoint(m);
        const Sxx = this.calcSxx(u);
        const Sxy = this.calcSxy(u);
        const Syy = this.calcSyy(u);
        const v1 = this.calcV1(u);
        const v2 = this.calcV2(u);
        const sol = this.linearSolve2x2([Sxx, Sxy, Sxy, Syy], [v1, v2]);

        if (sol === false) {
            // not enough points or points are colinear
            return result;
        }

        result.success = true;

        // compute radius from circle equation
        const radius2 = sol[0] * sol[0] + sol[1] * sol[1] + (Sxx + Syy) / this.points.length;
        result.radius = Math.sqrt(radius2);

        result.center.x = sol[0] + m.x;
        result.center.y = sol[1] + m.y;

        this.points.forEach(function (p) {
            const v = {x: p.x - result.center.x, y: p.y - result.center.y};
            const len2 = v.x * v.x + v.y * v.y;
            result.residue += radius2 - len2;
            const len = Math.sqrt(len2);
            result.distances.push(len - result.radius);
            result.projections.push({
                x: result.center.x + v.x * result.radius / len,
                y: result.center.y + v.y * result.radius / len
            });
        });

        result.computationTime = performance.now() - result.computationTime;

        return result;
    }


    private calcMeans(): CifiPoint {
        return this.points.reduce((p, c) => {
            return {
                x: p.x + c.x / this.points.length,
                y: p.y + c.y / this.points.length
            };
        }, {x: 0, y: 0});
    }


    private calcCenteredPoint(m: CifiPoint): CifiPoint[] {
        return this.points.map(e => {
            return {
                x: e.x - m.x,
                y: e.y - m.y
            };
        });
    }


    private calcSxx(u: CifiPoint[]): number {
        return u.reduce((p, c) => {
            return p + c.x * c.x;
        }, 0);
    }


    private calcSxy(u: CifiPoint[]): number {
        return u.reduce((p, c) => {
            return p + c.x * c.y;
        }, 0);
    }


    private calcSyy(u: CifiPoint[]): number {
        return u.reduce((p, c) => {
            return p + c.y * c.y;
        }, 0);
    }


    private calcV1(u: CifiPoint[]): number {
        return u.reduce((p, c) => {
            return p + 0.5 * (c.x * c.x * c.x + c.x * c.y * c.y);
        }, 0);
    }


    private calcV2(u: CifiPoint[]): number {
        return u.reduce((p, c) => {
            return p + 0.5 * (c.y * c.y * c.y + c.x * c.x * c.y);
        }, 0);
    }


    private linearSolve2x2(matrix: number[], vector: number[]): [number, number] | false {
        const det = matrix[0] * matrix[3] - matrix[1] * matrix[2];
        if (det < 1e-8) {
            return false;  // no solution
        }
        const y = (matrix[0] * vector[1] - matrix[2] * vector[0]) / det;
        const x = (vector[0] - matrix[1] * y) / matrix[0];
        return [x, y];
    }
}
