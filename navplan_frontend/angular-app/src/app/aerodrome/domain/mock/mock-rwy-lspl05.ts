import {AirportRunway} from '../model/airport-runway';
import {Length} from '../../../geo-physics/domain/model/quantities/length';


export class MockRwyLspl05 {
    public static create(): AirportRunway {
        return new AirportRunway(
            '05',
            'ASPH',
            Length.ofM(585),
            Length.ofM(18),
            52,
            Length.ofM(475),
            Length.ofM(525),
            false
        );
    }
}
