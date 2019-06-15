import {AltitudeUnit} from './altitude-unit';
import {AltitudeReference} from './altitude-reference';
import {LengthUnit} from '../quantities/units';


export class Altitude {
    public constructor(
        public value: number,
        public unit: AltitudeUnit,
        public reference: AltitudeReference
    ) {
    }
}
