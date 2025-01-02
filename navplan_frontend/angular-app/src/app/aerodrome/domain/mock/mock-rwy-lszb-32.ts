import {AirportRunway} from '../model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockRwyLszb32 {
    public static create(): AirportRunway {
        return new AirportRunway(
            '32',
            'ASPH',
            Length.ofM(1730),
            Length.ofM(30),
            140,
            Length.ofM(1530),
            Length.ofM(1730),
            true
        );
    }
}
