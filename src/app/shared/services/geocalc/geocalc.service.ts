import * as ol from 'openlayers';
import {Position2d} from '../../model/geometry/position2d';
import {Angle} from '../../model/quantities/angle';
import {AngleUnit, LengthUnit} from '../../model/units';
import {Distance} from '../../model/quantities/distance';
import {CircleFitter} from '../circle-fitter/circle-fitter';


const wgs84Sphere = new ol.Sphere(6378137);
const toRad = (Math.PI / 180);
const toDeg = (180 / Math.PI);


export class GeocalcService {
    public static getDistance(pos1: Position2d, pos2: Position2d): Distance {
        if (!pos1 || !pos2) {
            return undefined;
        }

        return new Distance(wgs84Sphere.haversineDistance(pos1.getLonLat(), pos2.getLonLat()) * 0.000539957, LengthUnit.NM);
    }


    public static getBearing(pos1: Position2d, pos2: Position2d, magvar: Angle = Angle.getZero()): Angle {
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


    public static calcCircleApproxBearing(posList: Position2d[]): Angle {
        if (!posList || posList.length <= 1) {
            return Angle.getZero();
        }

        if (posList.length === 2) {
            return this.getBearing(posList[0], posList[1]);
        }

        const PRECISION_FACTOR = 100000;
        const cf = new CircleFitter();
        const refLat = posList[0].latitude;
        for (const pos of posList) {
            cf.addPoint(
                this.calcLatProj(pos.latitude, refLat, PRECISION_FACTOR),
                pos.longitude * PRECISION_FACTOR);
        }
        const result = cf.compute();
        if (!result.success) {
            return Angle.getZero();
        }

        const center = new Position2d(
            result.center.y / PRECISION_FACTOR,
            this.calcLatUnProj(result.center.x, refLat, PRECISION_FACTOR));
        const radiusBearing = this.getBearing(center, posList[posList.length - 1]);

        const dirDeg = (radiusBearing.deg + (90 * this.getTurnDirection(posList, center))) % 360;
        return new Angle(dirDeg, AngleUnit.DEG);
    }


    private static calcLatProj(lat: number, refLat: number, precisionFactor: number): number {
        return (refLat + (lat - refLat) / Math.cos(refLat * toRad)) * precisionFactor;
    }


    private static calcLatUnProj(latProj: number, refLat: number, precisionFactor: number): number {
        return (latProj / precisionFactor - refLat) * Math.cos(refLat * toRad) + refLat;
    }


    private static getTurnDirection(posList: Position2d[], center: Position2d): number {
        let rotDeg = 0;
        let rad1 = this.getBearing(center, posList[0]);
        for (let i = 1; i < posList.length; i++) {
            const rad2 = this.getBearing(center, posList[i]);
            rotDeg += (rad2.deg - rad1.deg);
            rad1 = rad2;
        }

        return rotDeg > 0 ? 1 : -1;
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
                lonLat = GeocalcService.getLonLatFromGradMinSec(matchGradMinSec[1], matchGradMinSec[2], matchGradMinSec[3],
                    matchGradMinSec[4], matchGradMinSec[5], matchGradMinSec[6], matchGradMinSec[7], matchGradMinSec[8]);
            } else if (matchDecGrad != null) {
                lonLat = new Position2d(parseFloat(matchDecGrad[2]), parseFloat(matchDecGrad[1]));
            } else if (matchNotam != null) {
                lonLat = GeocalcService.getLonLatFromGradMinSec(matchNotam[1], matchNotam[2], matchNotam[3],
                    matchNotam[4], matchNotam[5], matchNotam[6], matchNotam[7], matchNotam[8]);
            }

            return lonLat;
        }
    }


    public static getLonLatFromGradMinSec(
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
