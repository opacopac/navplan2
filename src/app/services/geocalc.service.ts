import { Injectable } from '@angular/core';
import * as ol from 'openlayers';

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
}
