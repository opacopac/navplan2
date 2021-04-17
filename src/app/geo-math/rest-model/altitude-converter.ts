import {Altitude} from '../domain-model/geometry/altitude';
import {AltitudeUnit} from '../domain-model/geometry/altitude-unit';
import {AltitudeReference} from '../domain-model/geometry/altitude-reference';
import {IRestAltitude} from './i-rest-altitude';


export class AltitudeConverter {
    public static fromRest(restAlt: IRestAltitude): Altitude {
        return new Altitude(
            restAlt[0],
            AltitudeUnit[restAlt[1]],
            AltitudeReference[restAlt[2]]
        );
    }
}
