import {Altitude} from '../../geo-physics/domain-model/geometry/altitude';
import {AltitudeUnit} from '../../geo-physics/domain-model/geometry/altitude-unit';
import {AltitudeReference} from '../../geo-physics/domain-model/geometry/altitude-reference';
import {IRestAltitude} from './i-rest-altitude';


export class RestAltitudeConverter {
    public static fromRest(restAlt: IRestAltitude): Altitude {
        return restAlt ? new Altitude(
            restAlt[0],
            AltitudeUnit[restAlt[1]],
            AltitudeReference[restAlt[2]]
        ) : undefined;
    }


    public static toRest(alt: Altitude): IRestAltitude {
        return alt ? [
            alt.value,
            AltitudeUnit[alt.unit],
            AltitudeReference[alt.reference]
        ] : undefined;
    }
}
