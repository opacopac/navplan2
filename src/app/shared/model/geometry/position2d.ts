import * as ol from 'openlayers';
import {Geometry2d, Geometry2dType} from './geometry2d';
import {StringnumberService} from '../../services/stringnumber/stringnumber.service';
import {Clonable} from '../clonable';


export class Position2d implements Geometry2d, Clonable<Position2d> {
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


    public clone(): Position2d {
        return new Position2d(this.longitude, this.latitude);
    }


    public equals(position: Position2d, precisionDigits?: number): boolean {
        return StringnumberService.equals(this.longitude, position.longitude, precisionDigits)
            && StringnumberService.equals(this.latitude, position.latitude, precisionDigits);
    }


    public round(digits: number) {
        this.longitude = StringnumberService.roundToDigits(this.longitude, digits);
        this.latitude = StringnumberService.roundToDigits(this.latitude, digits);
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
