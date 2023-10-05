/**
 * original source code in C++: http://people.cas.uab.edu/~mosya/cl/CPPcircle.html
 */

export interface CifiPoint {
    x: number;
    y: number;
}


interface Moments {
    Mxx: number;
    Myy: number;
    Mxy: number;
    Mxz: number;
    Myz: number;
    Mzz: number;
}


interface CharPolyCoeff {
    Mz: number;
    Cov_xy: number;
    Var_z: number;
    A2: number;
    A1: number;
    A0: number;
    A22: number;
}


export interface CifiResult {
    points: CifiPoint[];
    center: CifiPoint;
    radius: number;
    success: boolean;
}


export class HyperCircleFitter {
    private points: CifiPoint[] = [];


    public addPoint(x: number, y: number) {
        this.points.push({x: x, y: y});
    }


    public resetPoints() {
        this.points = [];
    }


    public compute(): CifiResult {
        if (this.points.length < 3) {
            return this.createErrorResponse();
        }

        const meanPoint = this.calcMeanpoint();
        const moments = this.calcMoments(meanPoint);
        const coeff = this.calcCharPolyCoeff(moments);
        const root = this.calcRootOfCharPoly(coeff);
        const center = this.calcCircleCenter(root, coeff, moments);
        const radius = this.calcRadius(coeff, center, root);

        if (!center) {
            return this.createErrorResponse();
        }

        return {
            points: this.points,
            center: {
                x: center.x + meanPoint.x,
                y: center.y + meanPoint.y
            },
            radius: radius,
            success: true,
        };
        // res.s = Sigma(data, res); // TODO
    }


    private calcMeanpoint(): CifiPoint {
        return this.points.reduce((p, c) => {
            return {
                x: p.x + c.x / this.points.length,
                y: p.y + c.y / this.points.length
            };
        }, {x: 0, y: 0});
    }


    private calcMoments(meanPoint: CifiPoint): Moments {
        let Mxx = 0, Myy = 0, Mxy = 0, Mxz = 0, Myz = 0, Mzz = 0;

        for (let i = 0; i < this.points.length; i++) {
            const Xi = this.points[i].x - meanPoint.x;   //  centered x-coordinates
            const Yi = this.points[i].y - meanPoint.y;   //  centered y-coordinates
            const Zi = Xi * Xi + Yi * Yi;

            Mxy += Xi * Yi;
            Mxx += Xi * Xi;
            Myy += Yi * Yi;
            Mxz += Xi * Zi;
            Myz += Yi * Zi;
            Mzz += Zi * Zi;
        }

        return {
            Mxx: Mxx / this.points.length,
            Myy: Myy / this.points.length,
            Mxy: Mxy / this.points.length,
            Mxz: Mxz / this.points.length,
            Myz: Myz / this.points.length,
            Mzz: Mzz / this.points.length
        };
    }


    // computing the coefficients of the characteristic polynomial
    private calcCharPolyCoeff(mom: Moments): CharPolyCoeff {
        const Mz = mom.Mxx + mom.Myy;
        const Cov_xy = mom.Mxx * mom.Myy - mom.Mxy * mom.Mxy;
        const Var_z = mom.Mzz - Mz * Mz;

        const A2 = 4 * Cov_xy - 3 * Mz * Mz - mom.Mzz;
        const A1 = Var_z * Mz + 4 * Cov_xy * Mz - mom.Mxz * mom.Mxz - mom.Myz * mom.Myz;
        const A0 = mom.Mxz * (mom.Mxz * mom.Myy - mom.Myz * mom.Mxy) + mom.Myz * (mom.Myz * mom.Mxx - mom.Mxz * mom.Mxy) - Var_z * Cov_xy;
        const A22 = A2 + A2;

        return {
            Mz: Mz,
            Cov_xy: Cov_xy,
            Var_z: Var_z,
            A2: A2,
            A1: A1,
            A0: A0,
            A22: A22
        };
    }


    // finding the root of the characteristic polynomial
    // using Newton's method starting at x=0
    // (it is guaranteed to converge to the right root)
    private calcRootOfCharPoly(coeff: CharPolyCoeff): CifiPoint {
        const IterMAX = 99;
        let x = 0;
        let y = coeff.A0;
        for (let iter = 0; iter < IterMAX; iter++) { // usually, 4-6 iterations are enough
            const Dy = coeff.A1 + x * (coeff.A22 + 16 * x * x);
            const xnew = x - y / Dy;
            if (xnew === x || !isFinite(xnew)) {
                break;
            }
            const ynew = coeff.A0 + xnew * (coeff.A1 + xnew * (coeff.A2 + 4 * xnew * xnew));
            if (Math.abs(ynew) >= Math.abs(y)) {
                break;
            }
            x = xnew;
            y = ynew;
        }

        return { x: x, y: y };
    }


    // computing paramters of the fitting circle
    private calcCircleCenter(root: CifiPoint, coeff: CharPolyCoeff, mom: Moments): CifiPoint {
        const DET = root.x * root.x - root.x * coeff.Mz + coeff.Cov_xy;
        if (DET === 0) {
            return undefined;
        }
        const Xcenter = (mom.Mxz * (mom.Myy - root.x) - mom.Myz * mom.Mxy) / DET / 2;
        const Ycenter = (mom.Myz * (mom.Mxx - root.x) - mom.Mxz * mom.Mxy) / DET / 2;

        return { x: Xcenter, y: Ycenter};
    }


    private calcRadius(coeff: CharPolyCoeff, center: CifiPoint, root: CifiPoint): number {
        if (!center) {
            return undefined;
        }
        return Math.sqrt(center.x * center.x + center.y * center.y + coeff.Mz - root.x - root.x);
    }


    private createErrorResponse(): CifiResult {
        return {
            points: this.points,
            center: undefined,
            radius: undefined,
            success: false,
        };
    }
}
