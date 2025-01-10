import {Airport} from '../model/airport';
import {AirportType} from '../model/airport-type';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {MockRwyLspl05} from './mock-rwy-lspl05';
import {MockRwyLspl23} from './mock-rwy-lspl23';


export class MockAirportLspl {
    public static create() {
        const ad = new Airport(
            0,
            AirportType.AF_CIVIL,
            'LANGENTHAL',
            'LSPL',
            'CH',
            new Position2d(47.1828, 7.7414),
            new Altitude(480, AltitudeUnit.M, AltitudeReference.MSL),
        );

        ad.runways = [
            MockRwyLspl05.create(),
            MockRwyLspl23.create()
        ];

        return ad;
    }
}
