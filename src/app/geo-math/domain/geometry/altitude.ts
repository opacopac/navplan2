import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';
import {Clonable} from '../../../system/domain/clonable';


export class Altitude implements Clonable<Altitude> {
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
}
