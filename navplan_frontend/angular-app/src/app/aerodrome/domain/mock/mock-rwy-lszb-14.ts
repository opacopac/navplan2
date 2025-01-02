import {AirportRunway} from '../model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockRwyLszb14 {
    public static create(): AirportRunway {
        return new AirportRunway(
            '14',
            'ASPH',
            Length.ofM(1730),
            Length.ofM(30),
            140,
            Length.ofM(1730),
            Length.ofM(1530),
            true
        );
    }
}
