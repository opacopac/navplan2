import {Position2d} from '../domain/geometry/position2d';
import {Angle} from '../domain/quantities/angle';
import {AngleUnit} from '../domain/quantities/units';
import {BearingPos} from '../domain/geometry/bearing-pos';
import {HyperCircleFitter} from './hyper-circle-fitter';
import {GeocalcHelper} from './geocalc-helper';


// TODO
const toRad = (Math.PI / 180);


export class TrackFitter {
    public static calcTurnDirection(angle1: Angle, angle2: Angle): Angle {
        const deg1 = angle1.deg % 360;
        const deg2 = angle2.deg % 360;
        const diff = (deg2 - deg1 + 360) % 360;
        const deg = diff > 180 ? diff - 360 : diff;

        return new Angle(deg, AngleUnit.DEG);
    }


    public static calcApproxBearingPos(posList: Position2d[]): BearingPos {
        if (!posList || posList.length === 0) {
            return undefined;
        }

        const lastPos = posList[posList.length - 1];

        if (posList.length <= 1) {
            return new BearingPos(lastPos, Angle.getZero());
        }

        if (posList.length === 2) {
            return new BearingPos(lastPos, GeocalcHelper.calcBearing(posList[0], posList[1]));
        }

        const PRECISION_FACTOR = 1;
        const cf = new HyperCircleFitter();
        const refLat = posList[0].latitude;
        for (const pos of posList) {
            cf.addPoint(
                this.calcLatProj(pos.latitude, refLat, PRECISION_FACTOR),
                pos.longitude * PRECISION_FACTOR);
        }
        const result = cf.compute();

        // linear dependent or circle radius too big: assume straight line
        if (!result.success || result.radius > 10) {
            const directBearing = GeocalcHelper.calcBearing(posList[0], lastPos);
            return new BearingPos(lastPos, directBearing);
        }

        const center = new Position2d(
            result.center.y / PRECISION_FACTOR,
            this.calcLatUnProj(result.center.x, refLat, PRECISION_FACTOR));

        return this.calcBearingPos(posList, center);
    }


    private static calcLatProj(lat: number, refLat: number, precisionFactor: number): number {
        return (refLat + (lat - refLat) / Math.cos(refLat * toRad)) * precisionFactor;
    }


    private static calcLatUnProj(latProj: number, refLat: number, precisionFactor: number): number {
        return (latProj / precisionFactor - refLat) * Math.cos(refLat * toRad) + refLat;
    }


    private static calcBearingPos(posList: Position2d[], center: Position2d): BearingPos {
        let dirSumDeg = 0;
        let minDirSum = 0;
        let maxDirSum = 0;
        let minPos = posList[0];
        let maxPos = posList[0];
        let prevRadial = GeocalcHelper.calcBearing(center, posList[0]);
        for (let i = 1; i < posList.length; i++) {
            const radial = GeocalcHelper.calcBearing(center, posList[i]);
            dirSumDeg += this.calcTurnDirection(prevRadial, radial).deg;
            minDirSum = Math.min(minDirSum, dirSumDeg);
            maxDirSum = Math.max(maxDirSum, dirSumDeg);
            if (dirSumDeg === maxDirSum) {
                maxPos = posList[i];
            }
            if (dirSumDeg === minDirSum) {
                minPos = posList[i];
            }
            prevRadial = radial;
        }

        const headPos = dirSumDeg > 0 ? maxPos : minPos;
        const headOrientation = dirSumDeg > 0 ? 1 : -1;
        const headPosRadialBearing = GeocalcHelper.calcBearing(center, headPos);
        const dirDeg = (headPosRadialBearing.deg + (90 * headOrientation)) % 360;

        return new BearingPos(headPos, new Angle(dirDeg, AngleUnit.DEG));
    }
}
