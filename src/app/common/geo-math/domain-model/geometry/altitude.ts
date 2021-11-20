import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';
import {Clonable} from '../../../../system/domain-model/clonable';
import {Length} from '../quantities/length';
import {LengthUnit} from '../quantities/length-unit';


export class Altitude implements Clonable<Altitude> {
    private readonly FL_TO_FT_FACTOR = 100;


    public constructor(
        public value: number,
        public unit: AltitudeUnit,
        public reference: AltitudeReference
    ) {
        if ((this.unit === AltitudeUnit.FL && this.reference !== AltitudeReference.STD)
        || (this.reference === AltitudeReference.STD && this.unit !== AltitudeUnit.FL)) {
            throw new Error('unit FL must be combined with reference STD');
        }
    }


    public clone(): Altitude {
        return new Altitude(
            this.value,
            this.unit,
            this.reference
        );
    }


    public isEqual(alt: Altitude): boolean|undefined {
        if (this.reference === alt.reference && this.unit === alt.unit) {
            return this.value === alt.value;
        }

        return undefined;
    }


    public isLowerOrEqual(alt: Altitude): boolean|undefined {
        if (this.reference === alt.reference && this.unit === alt.unit) {
            return this.value <= alt.value;
        }

        return undefined;
    }


    public isHigherOrEqual(alt: Altitude): boolean|undefined {
        if (this.reference === alt.reference && this.unit === alt.unit) {
            return this.value >= alt.value;
        }

        return undefined;
    }


    public getHeightAmsl(terrainElevation: Length = Length.createZero()): Length {
        let lenUnit: LengthUnit;

        switch (this.unit) {
            case AltitudeUnit.M:
                lenUnit = LengthUnit.M;
                break;
            case AltitudeUnit.FT:
            case AltitudeUnit.FL:
                lenUnit = LengthUnit.FT;
                break;
            default:
                return undefined;
        }

        switch (this.reference) {
            case AltitudeReference.MSL:
                return new Length(this.value, lenUnit);
            case AltitudeReference.GND:
                return new Length(this.value + terrainElevation.getValue(lenUnit), lenUnit);
            case AltitudeReference.STD:
                return new Length(this.value * this.FL_TO_FT_FACTOR, lenUnit);
            default: return undefined;
        }
    }
}
