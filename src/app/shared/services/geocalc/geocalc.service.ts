import * as ol from 'openlayers';
import {Position2d} from '../../model/geometry/position2d';
import {Angle} from '../../model/quantities/angle';
import {AngleUnit, LengthUnit} from '../../model/quantities/units';
import {Length} from '../../model/quantities/length';
import {BearingPos} from '../../model/geometry/bearing-pos';
import {HyperCircleFitter} from '../circle-fitter/hyper-circle-fitter';
import {WorldMagneticModel} from '../../model/world-magnetic-model/WorldMagneticModel';
import {DatetimeService} from '../datetime/datetime.service';


const wgs84Sphere = new ol.Sphere(6378137);
const toRad = (Math.PI / 180);
const toDeg = (180 / Math.PI);


export class GeocalcService {
    private static wmm = new WorldMagneticModel();


    public static calcDistance(pos1: Position2d, pos2: Position2d): Length {
        if (!pos1 || !pos2) {
            return undefined;
        }

        return new Length(wgs84Sphere.haversineDistance(pos1.toArray(), pos2.toArray()) * 0.000539957, LengthUnit.NM);
    }


    public static calcBearing(pos1: Position2d, pos2: Position2d, magvar: Angle = Angle.getZero()): Angle {
        if (!pos1 || !pos2 || !magvar) {
            return undefined;
        }

        const f1 = pos1.latitude * toRad;
        const f2 = pos2.latitude * toRad;
        const dl = (pos2.longitude - pos1.longitude) * toRad;
        const y = Math.sin(dl) * Math.cos(f2);
        const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
        const t = Math.atan2(y, x);

        return new Angle((t * toDeg + 360) % 360 - magvar.getValue(AngleUnit.DEG), AngleUnit.DEG);
    }


    public static calcMagneticVariation(pos: Position2d): Angle {
        const decYear = DatetimeService.calcDecimalYear();
        const magvar = this.wmm.declination(0, pos.latitude, pos.longitude, decYear);

        return new Angle(magvar, AngleUnit.DEG);
    }


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
            return new BearingPos(lastPos, this.calcBearing(posList[0], posList[1]));
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
            const directBearing = this.calcBearing(posList[0], lastPos);
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
        let prevRadial = this.calcBearing(center, posList[0]);
        for (let i = 1; i < posList.length; i++) {
            const radial = this.calcBearing(center, posList[i]);
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
        const headPosRadialBearing = this.calcBearing(center, headPos);
        const dirDeg = (headPosRadialBearing.deg + (90 * headOrientation)) % 360;

        return new BearingPos(headPos, new Angle(dirDeg, AngleUnit.DEG));
    }


    public static tryParseCoordinates(queryString: string): Position2d {
        const gradMinSecPattern = /^(\d+)\D+(\d+)\D+([\d\.]+)(\D+)(\d+)\D+(\d+)\D+([\d\.]+)(\D*)$/i;
        const decGradPattern = /^([+-]?\d+\.\d+)[^\d\.+-]+([+-]?\d+\.\d+)$/i;
        const notamPattern = /^(\d{2})(\d{2})(\d{2})([NS])\s?(\d{2,3})(\d{2})(\d{2})([EW])$/i; // 463447N0062121E, 341640N0992240W
        const matchGradMinSec = gradMinSecPattern.exec(queryString);
        const matchDecGrad = decGradPattern.exec(queryString);
        const matchNotam = notamPattern.exec(queryString);

        if (matchGradMinSec != null || matchDecGrad != null || matchNotam != null) {
            let lonLat: Position2d;

            if (matchGradMinSec != null) {
                lonLat = GeocalcService.calcLonLatFromGradMinSec(matchGradMinSec[1], matchGradMinSec[2], matchGradMinSec[3],
                    matchGradMinSec[4], matchGradMinSec[5], matchGradMinSec[6], matchGradMinSec[7], matchGradMinSec[8]);
            } else if (matchDecGrad != null) {
                lonLat = new Position2d(parseFloat(matchDecGrad[2]), parseFloat(matchDecGrad[1]));
            } else if (matchNotam != null) {
                lonLat = GeocalcService.calcLonLatFromGradMinSec(matchNotam[1], matchNotam[2], matchNotam[3],
                    matchNotam[4], matchNotam[5], matchNotam[6], matchNotam[7], matchNotam[8]);
            }

            return lonLat;
        }
    }


    public static calcLonLatFromGradMinSec(
        latGrad: string,
        latMin: string,
        latSec: string,
        latDir: string,
        lonGrad: string,
        lonMin: string,
        lonSec: string,
        lonDir: string): Position2d {
        const latG = parseInt(latGrad, 10);
        const latM = parseInt(latMin, 10);
        const latS = parseFloat(latSec);
        let lat = latG + latM / 60 + latS / 3600;
        if (latDir.toUpperCase().indexOf('S') >= 0) {
            lat = -lat;
        }

        const lonG = parseInt(lonGrad, 10);
        const lonM = parseInt(lonMin, 10);
        const lonS = parseFloat(lonSec);
        let lon = lonG + lonM / 60 + lonS / 3600;
        if (lonDir.toUpperCase().indexOf('W') >= 0) {
            lon = -lon;
        }

        return new Position2d(lon, lat);
    }


    /* public static shrinkPositions(positions) {
        var shrinkedpos = [];

        for (var i = 0; i < positions.length; i++)
            shrinkedpos.push([
                roundToDigits(positions[i].latitude, 7),
                roundToDigits(positions[i].longitude, 7),
                positions[i].altitude ? roundToDigits(positions[i].altitude, 1) : null,
                positions[i].timestamp
            ]);

        return shrinkedpos;
    }


    public static unshrinkPositions(positions) {
        var unshrinkedpos = [];

        for (var i = 0; i < positions.length; i++)
            unshrinkedpos.push({
                latitude: positions[i][0],
                longitude: positions[i][1],
                altitude: positions[i][2],
                timestamp: positions[i][3]
            });

        return unshrinkedpos;
    }*/
}
