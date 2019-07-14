import {Geometry2d, Geometry2dType} from './geometry2d';
import {StringnumberHelper} from '../../../system/use-case/stringnumber/stringnumber-helper';
import {Clonable} from '../../../system/domain/clonable';
import {Angle} from '../quantities/angle';


export class Position2d implements Geometry2d, Clonable<Position2d> {
    public constructor(
        public longitude: number,
        public latitude: number
    ) {
        if (isNaN(longitude) || isNaN(latitude)) {
            throw new Error('parameter is not a number');
        }
    }


    public static createFromArray(lonLat: [number, number]): Position2d {
        return new Position2d(lonLat[0], lonLat[1]);
    }


    public clone(): Position2d {
        return new Position2d(this.longitude, this.latitude);
    }


    public equals(position: Position2d, precisionDigits?: number): boolean {
        return StringnumberHelper.equals(this.longitude, position.longitude, precisionDigits)
            && StringnumberHelper.equals(this.latitude, position.latitude, precisionDigits);
    }


    public round(digits: number) {
        this.longitude = StringnumberHelper.roundToDigits(this.longitude, digits);
        this.latitude = StringnumberHelper.roundToDigits(this.latitude, digits);
    }


    public getGeometryType(): Geometry2dType {
        return Geometry2dType.POSITION;
    }


    public toArray(): [number, number] {
        return [ this.longitude, this.latitude ];
    }


    public subtract(pos: Position2d): Position2d {
        return new Position2d(this.longitude - pos.longitude, this.latitude - pos.latitude);
    }


    public add(pos: Position2d): Position2d {
        return new Position2d(this.longitude + pos.longitude, this.latitude + pos.latitude);
    }


    public multiply(factor: number): Position2d {
        return new Position2d(this.longitude * factor, this.latitude * factor);
    }


    public distFromOrig(): number {
        return Math.sqrt(this.longitude * this.longitude + this.latitude * this.latitude);
    }


    public normalize(): Position2d {
        return this.multiply(1 / this.distFromOrig());
    }


    public rotate(center: Position2d, angle: Angle): Position2d {
        const pos = this.subtract(center);
        const rotPos = new Position2d(
            pos.longitude * Math.cos(-angle.rad) - pos.latitude * Math.sin(-angle.rad),
            pos.longitude * Math.sin(-angle.rad) + pos.latitude * Math.cos(-angle.rad)
        );

        return rotPos.add(center);
    }
}
