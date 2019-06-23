import {TrafficPrio} from './traffic-prio';
import {TrafficDataSource} from './traffic-data-source';
import {TrafficPositionMethod} from './traffic-position-method';
import {TrafficOgn1Mock} from '../mocks/traffic-ogn1.mock';


describe('TrafficPrio', () => {
    it('gets the correct prio from the table', () => {
        expect(TrafficPrio.getPrio(TrafficDataSource.OGN, TrafficPositionMethod.FLARM)).toBe(1);
        expect(TrafficPrio.getPrio(TrafficDataSource.OPENSKY, TrafficPositionMethod.ADSB)).toBe(1);
        expect(TrafficPrio.getPrio(TrafficDataSource.ADSBX2, TrafficPositionMethod.ADSB)).toBe(2);
        expect(TrafficPrio.getPrio(TrafficDataSource.ADSBX, TrafficPositionMethod.ADSB)).toBe(3);
        expect(TrafficPrio.getPrio(TrafficDataSource.ADSBX2, TrafficPositionMethod.MLAT)).toBe(4);
        expect(TrafficPrio.getPrio(TrafficDataSource.ADSBX, TrafficPositionMethod.MLAT)).toBe(5);
    });


    it('gets the lowest prio if not in table', () => {
        expect(TrafficPrio.getPrio(TrafficDataSource.OGN, TrafficPositionMethod.MLAT)).toBe(TrafficPrio.LOWEST_PRIO);
    });


    it('correctly compares 2 prios', () => {
        const pos1 = TrafficOgn1Mock.createPos();
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
