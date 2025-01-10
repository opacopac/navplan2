import {AirportRunway} from '../model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockRwyLspl23 {
    public static create(): AirportRunway {
        return new AirportRunway(
            '23',
            'ASPH',
            Length.ofM(585),
            Length.ofM(18),
            232,
            Length.ofM(585),
            Length.ofM(475),
            false
        );
    }
}
