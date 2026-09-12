import {MockVerticalRoute1} from "../mock/mock-vertical-route1";


describe('VerticalRoute', () => {
    beforeEach(() => {
    });


    it('initializes a vertical route with legs and steps', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        expect(route1.legs.length).toBe(3);
        expect(route1.legs[0].steps.length).toBe(3);
        expect(route1.legs[1].steps.length).toBe(3);
        expect(route1.legs[2].steps.length).toBe(3);
    });


    it('correctly identifies the first and last legs to/from airports', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        expect(route1.legs[0].isFirstLegFromAirport).toBeTrue();
        expect(route1.legs[1].isFirstLegFromAirport).toBeFalse();
        expect(route1.legs[2].isLastLegToAirport).toBeTrue();
    })


    it('calculates the correct flight time for each leg (incl. extra-time)', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        expect(route1.legs[0].flightTime.min).toBe(11); // +5min
        expect(route1.legs[1].flightTime.min).toBe(6);
        expect(route1.legs[2].flightTime.min).toBe(11); // +5min

        expect(route1.legs[0].climbTime.min).toBe(13); // +5min
        expect(route1.legs[1].climbTime.min).toBe(8);
        expect(route1.legs[2].climbTime.min).toBe(13); // +5min
    });


    it('calculates the correct step flight times for each leg', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].flightTime.min).toBe(0);
        expect(leg1.steps[1].flightTime.min).toBe(5.5);
        expect(leg1.steps[2].flightTime.min).toBe(5.5);

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.steps[0].flightTime.min).toBe(0);
        expect(leg2.steps[1].flightTime.min).toBe(3);
        expect(leg2.steps[2].flightTime.min).toBe(3);

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].flightTime.min).toBe(0);
        expect(leg3.steps[1].flightTime.min).toBe(5.5);
        expect(leg3.steps[2].flightTime.min).toBe(5.5);
    })


    it('calculates the correct minimum terrain clearance for each leg and step', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.minTerrainClearanceAlt.ft).toBe(1200);
        expect(leg1.steps[0].minTerrainClearanceAlt.ft).toBe(1000);
        expect(leg1.steps[1].minTerrainClearanceAlt.ft).toBe(1100);
        expect(leg1.steps[2].minTerrainClearanceAlt.ft).toBe(1200);

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.minTerrainClearanceAlt.ft).toBe(2400);
        expect(leg2.steps[0].minTerrainClearanceAlt.ft).toBe(2200);
        expect(leg2.steps[1].minTerrainClearanceAlt.ft).toBe(2300);
        expect(leg2.steps[2].minTerrainClearanceAlt.ft).toBe(2400);

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.minTerrainClearanceAlt.ft).toBe(1400);
        expect(leg3.steps[0].minTerrainClearanceAlt.ft).toBe(1400);
        expect(leg3.steps[1].minTerrainClearanceAlt.ft).toBe(1200);
        expect(leg3.steps[2].minTerrainClearanceAlt.ft).toBe(1100);
    });


    it('get the correct start/end user altitudes for each leg and first/last step', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.startAlt.minUserAlt.ft).toBe(1000); // ground elevation due to airport
        expect(leg1.steps[0].altMetaData.minUserAlt.ft).toBe(1000);
        expect(leg1.startAlt.maxUserAlt.ft).toBe(1000);
        expect(leg1.steps[0].altMetaData.maxUserAlt.ft).toBe(1000);

        expect(leg1.steps[1].altMetaData.minUserAlt).toBeUndefined();
        expect(leg1.steps[1].altMetaData.maxUserAlt).toBeUndefined();

        expect(leg1.endAlt.minUserAlt).toBeUndefined();
        expect(leg1.steps[2].altMetaData.minUserAlt).toBeUndefined();
        expect(leg1.endAlt.maxUserAlt.ft).toBe(5500); // wp2 max alt
        expect(leg1.steps[2].altMetaData.maxUserAlt.ft).toBe(5500);

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.startAlt.minUserAlt).toBeUndefined();
        expect(leg2.steps[0].altMetaData.minUserAlt).toBeUndefined();
        //expect(leg2.startAlt.maxUserAlt.ft).toBe(5500); // TODO
        //expect(leg2.firstStep().altMetaData.maxUserAlt.ft).toBe(5500); // TODO

        expect(leg2.steps[1].altMetaData.minUserAlt).toBeUndefined();
        expect(leg2.steps[1].altMetaData.maxUserAlt).toBeUndefined();

        expect(leg2.endAlt.minUserAlt.ft).toBe(3000); // wp3 min alt
        expect(leg2.steps[2].altMetaData.minUserAlt.ft).toBe(3000);
        expect(leg2.endAlt.maxUserAlt).toBeUndefined();
        expect(leg2.steps[2].altMetaData.maxUserAlt).toBeUndefined();

        // leg 3
        const leg3 = route1.legs[2];
        //expect(leg3.startAlt.minUserAlt.ft).toBe(3000); // TODO
        //expect(leg3.steps[0].altMetaData.minUserAlt.ft).toBe(3000); // TODO
        expect(leg3.startAlt.maxUserAlt).toBeUndefined();
        expect(leg3.steps[0].altMetaData.maxUserAlt).toBeUndefined();

        expect(leg3.steps[1].altMetaData.minUserAlt).toBeUndefined();
        expect(leg3.steps[1].altMetaData.maxUserAlt).toBeUndefined();

        expect(leg3.endAlt.minUserAlt.ft).toBe(1100); // ground elevation due to airport
        expect(leg3.steps[2].altMetaData.minUserAlt.ft).toBe(1100);
        expect(leg3.endAlt.maxUserAlt.ft).toBe(1100);
        expect(leg3.steps[2].altMetaData.maxUserAlt.ft).toBe(1100);
    })


    it('calculates the correct performance envelope min/max altitudes for each leg and step', () => {
        // given

        // when
        const route1 = MockVerticalRoute1.create();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].altMetaData.minEnvelopeAlt.ft).toBe(1000); // gnd
        expect(leg1.steps[0].altMetaData.maxEnvelopeAlt.ft).toBe(1000); // gnd
        expect(leg1.steps[1].altMetaData.minEnvelopeAlt.ft).toBe(1100); // gnd
        expect(leg1.steps[1].altMetaData.maxEnvelopeAlt.ft).toBeCloseTo(4672, 0);
        expect(leg1.steps[2].altMetaData.minEnvelopeAlt.ft).toBe(2200); // gnd + 1000
        expect(leg1.steps[2].altMetaData.maxEnvelopeAlt.ft).toBe(5500); // wp2 max alt

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.steps[0].altMetaData.minEnvelopeAlt.ft).toBe(2200); // gnd + 1000
        expect(leg2.steps[0].altMetaData.maxEnvelopeAlt.ft).toBe(5500); // wp2 max alt
        expect(leg2.steps[1].altMetaData.minEnvelopeAlt.ft).toBe(2300); // gnd + 1000
        expect(leg2.steps[1].altMetaData.maxEnvelopeAlt.ft).toBeCloseTo(7130, 0);
        expect(leg2.steps[2].altMetaData.minEnvelopeAlt.ft).toBe(3000); // wp3 min alt
        expect(leg2.steps[2].altMetaData.maxEnvelopeAlt.ft).toBe(6600); // 500fpm descent to 1100 (bwd)

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].altMetaData.minEnvelopeAlt.ft).toBe(3000); // wp3 min alt
        expect(leg3.steps[0].altMetaData.maxEnvelopeAlt.ft).toBe(6600); // 500fpm descent to 1100 (bwd)
        expect(leg3.steps[1].altMetaData.minEnvelopeAlt.ft).toBe(1200); // gnd
        expect(leg3.steps[1].altMetaData.maxEnvelopeAlt.ft).toBe(3850);
        expect(leg3.steps[2].altMetaData.minEnvelopeAlt.ft).toBe(1100); // gnd
        expect(leg3.steps[2].altMetaData.maxEnvelopeAlt.ft).toBe(1100); // gnd
    })
});
