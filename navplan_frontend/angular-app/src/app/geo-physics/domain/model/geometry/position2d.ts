import {Geometry2d, Geometry2dType} from './geometry2d';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Clonable} from '../../../../system/domain/model/clonable';


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
}
