import {Altitude} from '../domain/geometry/altitude';
import {AltitudeUnit} from '../domain/geometry/altitude-unit';
import {AltitudeReference} from '../domain/geometry/altitude-reference';
import {IRestAltitude} from './i-rest-altitude';


export class RestAltitude {
    public static fromRest(restAlt: IRestAltitude): Altitude {
        return new Altitude(
            restAlt[0],
            AltitudeUnit[restAlt[1]],
            AltitudeReference[restAlt[2]]
        );
    }
}
