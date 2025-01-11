import {MockRwyLszb14} from '../mock/mock-rwy-lszb-14';
import {MockRwyLspl05} from '../mock/mock-rwy-lspl05';
import {Length} from '../../../geo-physics/domain/model/quantities/length';

describe('AirportRunway', () => {
    beforeEach(() => {
    });


    it('returns the correct number of threshold stripes for a 30m width runway', () => {
        // given
        const rwy = MockRwyLszb14.create();

        // when
        const stripes = rwy.getThresholdStripeCount();

        // then
        expect(stripes).toBe(8);
    });


    it('returns the correct number of threshold stripes for a minimal width runway', () => {
        // given
        const rwy = MockRwyLspl05.create();

        // when
        const stripes = rwy.getThresholdStripeCount();

        // then
        expect(stripes).toBe(4);
    });


    it('returns the max number of stripes for a above max width runway', () => {
        // given
        const rwy = MockRwyLszb14.create();
        rwy.width = Length.ofM(100);

        // when
        const stripes = rwy.getThresholdStripeCount();

        // then
        expect(stripes).toBe(16);
    });


    it('returns 0 for a below min width runway', () => {
        // given
        const rwy = MockRwyLspl05.create();
        rwy.width = Length.ofM(5);

        // when
        const stripes = rwy.getThresholdStripeCount();

        // then
        expect(stripes).toBe(0);
    });


    it('returns 0 for runway with missing width', () => {
        // given
        const rwy = MockRwyLspl05.create();
        rwy.width = undefined;

        // when
        const stripes = rwy.getThresholdStripeCount();

        // then
        expect(stripes).toBe(0);
    });
});
