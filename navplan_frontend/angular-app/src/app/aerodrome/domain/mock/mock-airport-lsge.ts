import {Airport} from '../model/airport';
import {AirportType} from '../model/airport-type';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeUnit} from '../../../geo-physics/domain/model/geometry/altitude-unit';
import {AltitudeReference} from '../../../geo-physics/domain/model/geometry/altitude-reference';
import {MockRwyLsge09} from './mock-rwy-lsge09';
import {MockRwyLsge27} from './mock-rwy-lsge27';


export class MockAirportLsge {
    public static create() {
        const ad = new Airport(
            0,
            AirportType.AF_CIVIL,
            'ECUVILLENS',
            'LSGE',
            'CH',
            new Position2d(46.7553, 7.07583),
            new Altitude(700, AltitudeUnit.M, AltitudeReference.MSL),
        );

        ad.runways = [
            MockRwyLsge09.create(),
            MockRwyLsge27.create()
        ];

        return ad;
    }
}
