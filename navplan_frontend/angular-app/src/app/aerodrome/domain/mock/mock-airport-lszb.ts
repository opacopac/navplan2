import {Airport} from '../model/airport';
import {AirportType} from '../model/airport-type';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {MockRwyLszb14} from './mock-rwy-lszb-14';
import {MockRwyLszb32} from './mock-rwy-lszb-32';


export class MockAirportLszb {
    public static create() {
        const ad = new Airport(
            0,
            AirportType.INTL_APT,
            'BERN-BELP',
            'LSZB',
            'CHE',
            new Position2d(46.9122, 7.49944),
            new Altitude(510, AltitudeUnit.M, AltitudeReference.MSL),
        );

        ad.runways = [
            MockRwyLszb14.create(),
            MockRwyLszb32.create()
        ];

        return ad;
    }
}
