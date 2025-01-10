import {MockAirportLsge} from '../mock/mock-airport-lsge';
import {MockRwyLsge09} from '../mock/mock-rwy-lsge09';
import {AirportRunwayService} from './airport-runway.service';
import {MockAirportLszb} from '../mock/mock-airport-lszb';
import {MockRwyLszb14} from '../mock/mock-rwy-lszb-14';
import {MockRwyLszb32} from '../mock/mock-rwy-lszb-32';
import {MockAirportLspl} from '../mock/mock-airport-lspl';
import {MockRwyLspl23} from '../mock/mock-rwy-lspl23';
import {MockRwyLspl05} from '../mock/mock-rwy-lspl05';

describe('AirportRunwayService', () => {
    beforeEach(() => {
    });


    it('calculates the correct rwy threshold points without displacement', () => {
        // given
        const airport = MockAirportLsge.create();
        const rwy = MockRwyLsge09.create();

        // when
        const [threshold, oppThreshold] = AirportRunwayService.calcThresholdPoints(airport, rwy);

        // then
        expect(threshold.m).toBe(0);
        expect(oppThreshold.m).toBe(rwy.length.m);
    });


    it('calculates the correct rwy threshold points with one side displacement', () => {
        // given
        const airport = MockAirportLszb.create();
        const rwy14 = MockRwyLszb14.create();
        const rwy32 = MockRwyLszb32.create();

        // when
        const [threshold14, oppThreshold14] = AirportRunwayService.calcThresholdPoints(airport, rwy14);
        const [threshold32, oppThreshold32] = AirportRunwayService.calcThresholdPoints(airport, rwy32);

        // then
        expect(threshold14.m).toBe(200);
        expect(oppThreshold14.m).toBe(1730);
        expect(threshold32.m).toBe(0);
        expect(oppThreshold32.m).toBe(1530);
    });


    it('calculates the correct rwy threshold points with one side displacement and displaced rwy end', () => {
        // given
        const airport = MockAirportLspl.create();
        const rwy05 = MockRwyLspl05.create();
        const rwy23 = MockRwyLspl23.create();

        // when
        const [threshold05, oppThreshold05] = AirportRunwayService.calcThresholdPoints(airport, rwy05);
        const [threshold23, oppThreshold23] = AirportRunwayService.calcThresholdPoints(airport, rwy23);

        // then
        expect(threshold05.m).toBe(0);
        expect(oppThreshold05.m).toBe(475);
        expect(threshold23.m).toBe(110);
        expect(oppThreshold23.m).toBe(585);
    });


    it('calculates the correct rwy threshold points with missing opposite rwy from lda', () => {
        // given
        const airport = MockAirportLszb.create();
        airport.runways.pop();
        const rwy14 = MockRwyLszb14.create();

        // when
        const [threshold14, oppThreshold14] = AirportRunwayService.calcThresholdPoints(airport, rwy14);

        // then
        expect(threshold14.m).toBe(200);
        expect(oppThreshold14.m).toBe(1730);
    });
});
