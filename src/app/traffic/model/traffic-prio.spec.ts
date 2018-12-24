import {TrafficPrio} from './traffic-prio';
import {TrafficDataSource} from './traffic';
import {TrafficPositionMethod} from './traffic-position';
import {TrafficMock} from '../test/traffic-mock';


describe('TrafficPrio', () => {
    it('gets the correct prio from the table', () => {
        expect(TrafficPrio.getPrio(TrafficDataSource.OGN, TrafficPositionMethod.FLARM)).toBe(1);
        expect(TrafficPrio.getPrio(TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB)).toBe(1);
        expect(TrafficPrio.getPrio(TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB)).toBe(2);
        expect(TrafficPrio.getPrio(TrafficDataSource.ADSBX, TrafficPositionMethod.MLAT)).toBe(3);
    });


    it('gets the correct prio if not in table', () => {
        expect(TrafficPrio.getPrio(TrafficDataSource.OGN, TrafficPositionMethod.MLAT)).toBe(3);
    });


    it('correctly compares 2 prios', () => {
        const pos1 = TrafficMock.MOCK_POSITION_1;
        pos1.source = TrafficDataSource.OGN;
        pos1.method = TrafficPositionMethod.FLARM;
        const pos2 = pos1.clone();
        pos2.source = TrafficDataSource.ADSBX;
        pos2.method = TrafficPositionMethod.MLAT;

        expect(TrafficPrio.hasHigherPrio(pos1, pos2)).toBe(true);
        expect(TrafficPrio.hasHigherPrio(pos2, pos1)).toBe(false);
        expect(TrafficPrio.hasHigherPrio(pos1, pos1)).toBe(false);
    });
});
