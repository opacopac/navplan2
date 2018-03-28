import * as ol from 'openlayers';
import { Injectable } from '@angular/core';
import { Position2d } from '../../model/position';


const wgs84Sphere = new ol.Sphere(6378137);
const toRad = (Math.PI / 180);
const toDeg = (180 / Math.PI);


@Injectable()
export class GeocalcService {
    constructor() {
    }


    public static getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        return (wgs84Sphere.haversineDistance([lon1, lat1], [lon2, lat2]) * 0.000539957);
    }


    public static getBearing(lat1, lon1, lat2, lon2, magvar): number {
        const f1 = lat1 * toRad;
        const f2 = lat2 * toRad;
        const dl = (lon2 - lon1) * toRad;
        const y = Math.sin(dl) * Math.cos(f2);
        const x = Math.cos(f1) * Math.sin(f2) - Math.sin(f1) * Math.cos(f2) * Math.cos(dl);
        const t = Math.atan2(y, x);

        return ((t * toDeg + 360) % 360 - magvar);
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
                lonLat = GeocalcService.getLonLatFromGradMinSec(matchGradMinSec[1], matchGradMinSec[2], matchGradMinSec[3], matchGradMinSec[4], matchGradMinSec[5], matchGradMinSec[6], matchGradMinSec[7], matchGradMinSec[8]);
            } else if (matchDecGrad != null) {
                lonLat = new Position2d(parseFloat(matchDecGrad[2]), parseFloat(matchDecGrad[1]));
            } else if (matchNotam != null) {
                lonLat = GeocalcService.getLonLatFromGradMinSec(matchNotam[1], matchNotam[2], matchNotam[3], matchNotam[4], matchNotam[5], matchNotam[6], matchNotam[7], matchNotam[8]);
            }

            return lonLat;
        }
    }


    public static getLonLatFromGradMinSec(latGrad: string, latMin: string, latSec: string, latDir: string, lonGrad: string, lonMin: string, lonSec: string, lonDir: string): Position2d {
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
