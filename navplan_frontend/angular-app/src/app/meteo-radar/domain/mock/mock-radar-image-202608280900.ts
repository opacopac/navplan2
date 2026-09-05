import {RadarImage} from '../model/radar-image';


export class MockRadarImage202608280900 {
    public static create() {
        return new RadarImage(
            new Date('2026-08-28T08:55:00Z'),
            new Date('2026-08-28T09:00:00Z')
        );
    }
}
