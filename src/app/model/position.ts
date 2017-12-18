import { Timestamp } from './timestamp';
import * as ol from 'openlayers';


export class Position2d {
    public latitude: number;
    public longitude: number;

    public constructor(lon: number, lat: number) {
        this.longitude = lon;
        this.latitude = lat;
    }


    public static createFromLonLat(lonLat: [number, number]): Position2d {
        return new Position2d(lonLat[0], lonLat[1]);
    }


    public static createFromMercator(posMercator: [number, number]): Position2d {
        const lonLat = ol.proj.toLonLat(posMercator);
        return new Position2d(lonLat[0], lonLat[1]);
    }


    public getLonLat(): [number, number] {
        return [ this.longitude, this.latitude ];
    }


    public getMercator(): [number, number] {
        return ol.proj.fromLonLat(this.getLonLat());
    }
}


export class Position3d extends Position2d {
    public altitude: number;
}


export class Position4d extends Position3d {
    public timestamp: Timestamp;
}
