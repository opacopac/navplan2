import * as ol from 'openlayers';
import { Timestamp } from './timestamp';
import { Altitude } from './altitude';
import {Geometry2d, Geometry2dType} from './geometry2d';


export class Position2d implements Geometry2d {
    public constructor(
        public longitude: number,
        public latitude: number) {
    }


    public static createFromLonLat(lonLat: [number, number]): Position2d {
        return new Position2d(lonLat[0], lonLat[1]);
    }


    public static createFromMercator(posMercator: [number, number]): Position2d {
        const lonLat = ol.proj.toLonLat(posMercator);
        return new Position2d(lonLat[0], lonLat[1]);
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.POSITION;
    }


    public getLonLat(): [number, number] {
        return [ this.longitude, this.latitude ];
    }


    public getMercator(): [number, number] {
        return ol.proj.fromLonLat(this.getLonLat());
    }
}


export class Position3d extends Position2d {
    public altitude: Altitude;


    public constructor(lon: number, lat: number, altitude: Altitude) {
        super(lon, lat);
        this.altitude = altitude;
    }


    public hasAltitude(): boolean {
        return this.altitude != null;
    }
}


export class Position4d extends Position3d {
    public timestamp: Timestamp;


    public constructor(lon: number, lat: number, altitude: Altitude, timestamp: Timestamp) {
        super(lon, lat, altitude);
        this.timestamp = timestamp;
    }
}
