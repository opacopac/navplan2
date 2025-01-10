import {AirportRunway} from '../model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockRwyLsge27 {
    public static create(): AirportRunway {
        return new AirportRunway(
            '27',
            'ASPH',
            Length.ofM(800),
            Length.ofM(30),
            273,
            Length.ofM(800),
            Length.ofM(800),
            true
        );
    }
}
