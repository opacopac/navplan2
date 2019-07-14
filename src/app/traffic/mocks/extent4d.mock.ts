import {Extent4d} from '../../geo-math/domain/geometry/extent4d';
import {Altitude} from '../../geo-math/domain/geometry/altitude';
import {AltitudeUnit} from '../../geo-math/domain/geometry/altitude-unit';
import {AltitudeReference} from '../../geo-math/domain/geometry/altitude-reference';
import {Timestamp} from '../../geo-math/domain/quantities/timestamp';


export class Extent4dMock {
    public static create(): Extent4d {
        return new Extent4d(
            7.0,
            47.0,
            new Altitude(0, AltitudeUnit.FT, AltitudeReference.MSL),
            Timestamp.createFromSec(1560089394),
        7.9,
            47.9,
            new Altitude(15000, AltitudeUnit.FT, AltitudeReference.MSL),
            Timestamp.createFromSec(1560889394),
        );
    }
}
