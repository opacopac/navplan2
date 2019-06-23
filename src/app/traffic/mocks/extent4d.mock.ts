import {Extent4d} from '../../shared/model/geometry/extent4d';
import {Altitude} from '../../shared/model/geometry/altitude';
import {AltitudeUnit} from '../../shared/model/geometry/altitude-unit';
import {AltitudeReference} from '../../shared/model/geometry/altitude-reference';
import {Timestamp} from '../../shared/model/quantities/timestamp';


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