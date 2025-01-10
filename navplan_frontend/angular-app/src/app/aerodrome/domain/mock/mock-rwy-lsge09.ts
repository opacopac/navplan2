import {AirportRunway} from '../model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockRwyLsge09 {
    public static create(): AirportRunway {
        return new AirportRunway(
            '09',
            'ASPH',
            Length.ofM(800),
            Length.ofM(30),
            93,
            Length.ofM(800),
            Length.ofM(800),
            true
        );
    }
}
