import {RadarImage} from '../model/radar-image';


export class MockRadarImage202608280905 {
    public static create() {
        return new RadarImage(
            new Date('2026-08-28T09:00:00Z'),
            new Date('2026-08-28T09:05:00Z')
        );
    }
}
