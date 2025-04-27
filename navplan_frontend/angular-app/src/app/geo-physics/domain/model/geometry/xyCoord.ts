import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {Clonable} from '../../../../system/domain/model/clonable';


export class XyCoord implements Clonable<XyCoord> {
    public constructor(
        public x: number,
        public y: number
    ) {
        if (isNaN(x) || isNaN(y)) {
            throw new Error('parameter is not a number');
        }
    }

    public clone(): XyCoord {
        return new XyCoord(this.x, this.y);
    }


    public round(digits: number): XyCoord {
        this.x = StringnumberHelper.roundToDigits(this.x, digits);
        this.y = StringnumberHelper.roundToDigits(this.y, digits);

        return this;
    }


    public toArray(): [number, number] {
        return [this.x, this.y];
    }


    public toObject(): { x: number, y: number } {
        return {x: this.x, y: this.y};
    }
}
