import {MockVerticalRoute1} from "../mock/mock-vertical-route1";
import {MockVerticalRoute2} from "../mock/mock-vertical-route2";
import {MockVerticalRoute3} from "../mock/mock-vertical-route3";


describe('VerticalRoute', () => {
    beforeEach(() => {
    });


    it('initializes a vertical route with legs and steps', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        expect(route1.legs.length).toBe(3);
        expect(route1.legs[0].steps.length).toBe(3);
        expect(route1.legs[1].steps.length).toBe(3);
        expect(route1.legs[2].steps.length).toBe(3);
    });


    it('correctly identifies the first and last legs to/from airports', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        expect(route1.legs[0].isFirstLegFromAirport).toBeTrue();
        expect(route1.legs[1].isFirstLegFromAirport).toBeFalse();
        expect(route1.legs[2].isLastLegToAirport).toBeTrue();
    })


    it('calculates the correct flight time for each leg (incl. extra-time)', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        expect(route1.legs[0].flightTime.min).toBe(11); // +5min
        expect(route1.legs[1].flightTime.min).toBe(6);
        expect(route1.legs[2].flightTime.min).toBe(11); // +5min

        expect(route1.legs[0].climbTime.min).toBe(13); // +5min
        expect(route1.legs[1].climbTime.min).toBe(8);
        expect(route1.legs[2].climbTime.min).toBe(13); // +5min
    });


    it('calculates the correct step flight and climb times for each leg', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].flightTime.min).toBe(0);
        expect(leg1.steps[0].climbTime.min).toBe(0);
        expect(leg1.steps[1].flightTime.min).toBe(5.5);
        expect(leg1.steps[1].climbTime.min).toBe(6.5);
        expect(leg1.steps[2].flightTime.min).toBe(5.5);
        expect(leg1.steps[2].climbTime.min).toBe(6.5);

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.steps[0].flightTime.min).toBe(0);
        expect(leg2.steps[0].climbTime.min).toBe(0);
        expect(leg2.steps[1].flightTime.min).toBe(3);
        expect(leg2.steps[1].climbTime.min).toBe(4);
        expect(leg2.steps[2].flightTime.min).toBe(3);
        expect(leg2.steps[2].climbTime.min).toBe(4);

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].flightTime.min).toBe(0);
        expect(leg3.steps[0].climbTime.min).toBe(0);
        expect(leg3.steps[1].flightTime.min).toBe(5.5);
        expect(leg3.steps[1].climbTime.min).toBe(6.5);
        expect(leg3.steps[2].flightTime.min).toBe(5.5);
        expect(leg3.steps[2].climbTime.min).toBe(6.5);
    });


    it('calculates the correct minimum terrain clearance for each leg and step', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        // leg 1 (first leg from airport WP1 @ 0nm): 0ft clearance within 0-2nm, 500ft within 2-5nm, 1000ft beyond 5nm
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].minTerrainClearanceAlt.ft).toBe(1000); // 0nm from airport -> +0ft
        expect(leg1.steps[1].minTerrainClearanceAlt.ft).toBe(1600); // 5nm from airport -> +500ft
        expect(leg1.steps[2].minTerrainClearanceAlt.ft).toBe(2200); // 10nm from airport -> +1000ft
        expect(leg1.minTerrainClearanceAlt.ft).toBe(2200);

        // leg 2 (not adjacent to an airport): always 1000ft clearance
        const leg2 = route1.legs[1];
        expect(leg2.minTerrainClearanceAlt.ft).toBe(2400);
        expect(leg2.steps[0].minTerrainClearanceAlt.ft).toBe(2200);
        expect(leg2.steps[1].minTerrainClearanceAlt.ft).toBe(2300);
        expect(leg2.steps[2].minTerrainClearanceAlt.ft).toBe(2400);

        // leg 3 (last leg to airport WP4 @ 30nm): 0ft clearance within 0-2nm, 500ft within 2-5nm, 1000ft beyond 5nm
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].minTerrainClearanceAlt.ft).toBe(2400); // 10nm from airport -> +1000ft
        expect(leg3.steps[1].minTerrainClearanceAlt.ft).toBe(1700); // 5nm from airport -> +500ft
        expect(leg3.steps[2].minTerrainClearanceAlt.ft).toBe(1100); // 0nm from airport -> +0ft
        expect(leg3.minTerrainClearanceAlt.ft).toBe(2400);
    });


    it('calculates the correct minimum terrain clearance for a single steep leg', () => {
        // given
        const route2 = MockVerticalRoute2.create();

        // when
        route2.calculate();

        // then
        const leg1 = route2.legs[0];
        expect(leg1.steps[0].minTerrainClearanceAlt.ft).toBe(0); // 0 + 0 (at airport)
        expect(leg1.steps[1].minTerrainClearanceAlt.ft).toBe(2000); // 2000 + 0 (2nm from airport)
        expect(leg1.steps[2].minTerrainClearanceAlt.ft).toBe(4500); // 4000 + 500 (4nm from airport)
        expect(leg1.steps[3].minTerrainClearanceAlt.ft).toBe(7000); // 6000 + 1000 (6nm from airport)
        expect(leg1.steps[4].minTerrainClearanceAlt.ft).toBe(9000); // 8000 + 1000 (8nm from airport)
        expect(leg1.steps[5].minTerrainClearanceAlt.ft).toBe(11000); // 10000 + 1000 (10nm from airport)
        expect(leg1.steps[6].minTerrainClearanceAlt.ft).toBe(9000); // 8000 + 1000 (8nm from airport)
        expect(leg1.steps[7].minTerrainClearanceAlt.ft).toBe(7000); // 6000 + 1000 (6nm from airport)
        expect(leg1.steps[8].minTerrainClearanceAlt.ft).toBe(4500); // 4000 + 500 (4nm from airport)
        expect(leg1.steps[9].minTerrainClearanceAlt.ft).toBe(2000); // 2000 + 0 (2nm from airport)
        expect(leg1.steps[10].minTerrainClearanceAlt.ft).toBe(0); // 0 + 0 (at airport)
    });


    it('get the correct start/end user altitudes for each leg and first/last step', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.startAlt.user.minAlt.ft).toBe(1000); // ground elevation due to airport
        expect(leg1.steps[0].altMetaData.user.minAlt.ft).toBe(1000);
        expect(leg1.startAlt.user.maxAlt.ft).toBe(1000);
        expect(leg1.steps[0].altMetaData.user.maxAlt.ft).toBe(1000);

        expect(leg1.steps[1].altMetaData.user.minAlt).toBeUndefined();
        expect(leg1.steps[1].altMetaData.user.maxAlt).toBeUndefined();

        expect(leg1.endAlt.user.minAlt).toBeUndefined();
        expect(leg1.steps[2].altMetaData.user.minAlt).toBeUndefined();
        expect(leg1.endAlt.user.maxAlt.ft).toBe(5500); // wp2 max alt
        expect(leg1.steps[2].altMetaData.user.maxAlt.ft).toBe(5500);

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.startAlt.user.minAlt).toBeUndefined();
        expect(leg2.steps[0].altMetaData.user.minAlt).toBeUndefined();
        //expect(leg2.startAlt.userAlt.maxAlt.ft).toBe(5500); // TODO
        //expect(leg2.firstStep().altMetaData.userAlt.maxAlt.ft).toBe(5500); // TODO

        expect(leg2.steps[1].altMetaData.user.minAlt).toBeUndefined();
        expect(leg2.steps[1].altMetaData.user.maxAlt).toBeUndefined();

        expect(leg2.endAlt.user.minAlt.ft).toBe(3000); // wp3 min alt
        expect(leg2.steps[2].altMetaData.user.minAlt.ft).toBe(3000);
        expect(leg2.endAlt.user.maxAlt).toBeUndefined();
        expect(leg2.steps[2].altMetaData.user.maxAlt).toBeUndefined();

        // leg 3
        const leg3 = route1.legs[2];
        //expect(leg3.startAlt.userAlt.minAlt.ft).toBe(3000); // TODO
        //expect(leg3.steps[0].altMetaData.userAlt.minAlt.ft).toBe(3000); // TODO
        expect(leg3.startAlt.user.maxAlt).toBeUndefined();
        expect(leg3.steps[0].altMetaData.user.maxAlt).toBeUndefined();

        expect(leg3.steps[1].altMetaData.user.minAlt).toBeUndefined();
        expect(leg3.steps[1].altMetaData.user.maxAlt).toBeUndefined();

        expect(leg3.endAlt.user.minAlt.ft).toBe(1100); // ground elevation due to airport
        expect(leg3.steps[2].altMetaData.user.minAlt.ft).toBe(1100);
        expect(leg3.endAlt.user.maxAlt.ft).toBe(1100);
        expect(leg3.steps[2].altMetaData.user.maxAlt.ft).toBe(1100);
    })


    it('calculates the correct performance envelope min/max altitudes for each leg and step', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].altMetaData.perfEnv.minAlt.ft).toBe(1000); // gnd
        expect(leg1.steps[0].altMetaData.perfEnv.maxAlt.ft).toBe(1000); // gnd
        expect(leg1.steps[1].altMetaData.perfEnv.minAlt.ft).toBe(1600); // gnd + 500 (terrain clearance 2-5nm from airport)
        expect(leg1.steps[1].altMetaData.perfEnv.maxAlt.ft).toBeCloseTo(4672, 0); // max climb from 1000
        expect(leg1.steps[2].altMetaData.perfEnv.minAlt.ft).toBe(2200); // gnd + 1000
        expect(leg1.steps[2].altMetaData.perfEnv.maxAlt.ft).toBe(5500); // wp2 max alt

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.steps[0].altMetaData.perfEnv.minAlt.ft).toBe(2200); // gnd + 1000
        expect(leg2.steps[0].altMetaData.perfEnv.maxAlt.ft).toBe(5500); // wp2 max alt
        expect(leg2.steps[1].altMetaData.perfEnv.minAlt.ft).toBe(2300); // gnd + 1000
        expect(leg2.steps[1].altMetaData.perfEnv.maxAlt.ft).toBeCloseTo(7130, 0); // max climb from 5500
        expect(leg2.steps[2].altMetaData.perfEnv.minAlt.ft).toBe(3000); // wp3 min alt
        expect(leg2.steps[2].altMetaData.perfEnv.maxAlt.ft).toBe(6600); // 500fpm descent to 3850

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].altMetaData.perfEnv.minAlt.ft).toBe(3000); // wp3 min alt
        expect(leg3.steps[0].altMetaData.perfEnv.maxAlt.ft).toBe(6600); // 500fpm descent to 3850
        expect(leg3.steps[1].altMetaData.perfEnv.minAlt.ft).toBe(1700); // gnd + 500 (terrain clearance 2-5nm from airport)
        expect(leg3.steps[1].altMetaData.perfEnv.maxAlt.ft).toBe(3850); // 500fpm descent to 1100
        expect(leg3.steps[2].altMetaData.perfEnv.minAlt.ft).toBe(1100); // gnd
        expect(leg3.steps[2].altMetaData.perfEnv.maxAlt.ft).toBe(1100); // gnd
    })


    it('calculates the correct performance steep envelope min/max altitudes for each leg and step', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].altMetaData.perfEnvSteep.minAlt.ft).toBe(1000); // gnd
        expect(leg1.steps[0].altMetaData.perfEnvSteep.maxAlt.ft).toBe(1000); // gnd
        expect(leg1.steps[1].altMetaData.perfEnvSteep.minAlt.ft).toBe(1600); // gnd + 500 (terrain clearance 2-5nm from airport)
        expect(leg1.steps[1].altMetaData.perfEnvSteep.maxAlt.ft).toBeCloseTo(4672, 0); // max climb from 1000
        expect(leg1.steps[2].altMetaData.perfEnvSteep.minAlt.ft).toBe(2200); // gnd + 1000
        expect(leg1.steps[2].altMetaData.perfEnvSteep.maxAlt.ft).toBe(5500); // wp2 max alt

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.steps[0].altMetaData.perfEnvSteep.minAlt.ft).toBe(2200); // gnd + 1000
        expect(leg2.steps[0].altMetaData.perfEnvSteep.maxAlt.ft).toBe(5500); // wp2 max alt
        expect(leg2.steps[1].altMetaData.perfEnvSteep.minAlt.ft).toBe(2300); // gnd + 1000
        expect(leg2.steps[1].altMetaData.perfEnvSteep.maxAlt.ft).toBeCloseTo(7130, 0); // max climb from 5500
        expect(leg2.steps[2].altMetaData.perfEnvSteep.minAlt.ft).toBe(3000); // wp3 min alt
        expect(leg2.steps[2].altMetaData.perfEnvSteep.maxAlt.ft).toBeCloseTo(8484, 0); // max climb from 7130

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].altMetaData.perfEnvSteep.minAlt.ft).toBe(3000); // wp3 min alt
        expect(leg3.steps[0].altMetaData.perfEnvSteep.maxAlt.ft).toBeCloseTo(8484, 0); // max climb from 7130
        expect(leg3.steps[1].altMetaData.perfEnvSteep.minAlt.ft).toBe(1700); // gnd + 500 (terrain clearance 2-5nm from airport)
        expect(leg3.steps[1].altMetaData.perfEnvSteep.maxAlt.ft).toBe(6600); // 1000fpm descent to 1100
        expect(leg3.steps[2].altMetaData.perfEnvSteep.minAlt.ft).toBe(1100); // gnd
        expect(leg3.steps[2].altMetaData.perfEnvSteep.maxAlt.ft).toBe(1100); // gnd
    })


    it('calculates the correct performance envelope min/max altitudes for a single too steep leg', () => {
        // given
        const route2 = MockVerticalRoute2.create();

        // when
        route2.calculate();

        // then
        const leg1 = route2.legs[0];
        expect(leg1.steps[0].altMetaData.perfEnvSteep.minAlt.ft).toBe(0); // gnd
        expect(leg1.steps[0].altMetaData.perfEnvSteep.maxAlt.ft).toBe(0); // gnd
        expect(leg1.steps[1].altMetaData.perfEnvSteep.minAlt.ft).toBe(2000);
        expect(leg1.steps[1].altMetaData.perfEnvSteep.maxAlt.ft).toBe(2000);
        expect(leg1.steps[2].altMetaData.perfEnvSteep.minAlt.ft).toBe(4500);
        expect(leg1.steps[2].altMetaData.perfEnvSteep.maxAlt.ft).toBe(4500);
        expect(leg1.steps[3].altMetaData.perfEnvSteep.minAlt.ft).toBe(7000);
        expect(leg1.steps[3].altMetaData.perfEnvSteep.maxAlt.ft).toBe(7000);
        expect(leg1.steps[4].altMetaData.perfEnvSteep.minAlt.ft).toBe(9000);
        expect(leg1.steps[4].altMetaData.perfEnvSteep.maxAlt.ft).toBe(9000);
        expect(leg1.steps[5].altMetaData.perfEnvSteep.minAlt.ft).toBe(11000);
        expect(leg1.steps[5].altMetaData.perfEnvSteep.maxAlt.ft).toBe(11000);
        expect(leg1.steps[6].altMetaData.perfEnvSteep.minAlt.ft).toBe(9800); // 1000fpm descent from 11000 in 1.2min
        expect(leg1.steps[6].altMetaData.perfEnvSteep.maxAlt.ft).toBe(9800); // etc.
        expect(leg1.steps[7].altMetaData.perfEnvSteep.minAlt.ft).toBe(8600);
        expect(leg1.steps[7].altMetaData.perfEnvSteep.maxAlt.ft).toBe(8600);
        expect(leg1.steps[8].altMetaData.perfEnvSteep.minAlt.ft).toBe(7400);
        expect(leg1.steps[8].altMetaData.perfEnvSteep.maxAlt.ft).toBe(7400);
        expect(leg1.steps[9].altMetaData.perfEnvSteep.minAlt.ft).toBe(6200);
        expect(leg1.steps[9].altMetaData.perfEnvSteep.maxAlt.ft).toBe(6200);
        expect(leg1.steps[10].altMetaData.perfEnvSteep.minAlt.ft).toBe(0); // gnd
        expect(leg1.steps[10].altMetaData.perfEnvSteep.maxAlt.ft).toBe(0); // gnd
    });


    it('calculates the correct performance envelope min/max altitudes for a single steep leg', () => {
        // given
        const route3 = MockVerticalRoute3.create();

        // when
        route3.calculate();

        // then
        const leg1 = route3.legs[0];
        // standard envelope
        expect(leg1.steps[0].altMetaData.perfEnv.minAlt.ft).toBe(0); // gnd
        expect(leg1.steps[0].altMetaData.perfEnv.maxAlt.ft).toBe(0); // gnd
        expect(leg1.steps[1].altMetaData.perfEnv.minAlt.ft).toBe(7000); // gnd + 1000
        expect(leg1.steps[1].altMetaData.perfEnv.maxAlt.ft).toBe(7000); // gnd + 1000
        expect(leg1.steps[2].altMetaData.perfEnv.minAlt.ft).toBe(5500); // 500fpm descent from 7000 in 3min
        expect(leg1.steps[2].altMetaData.perfEnv.maxAlt.ft).toBe(5500); // 500fpm descent from 7000 in 3min
        expect(leg1.steps[3].altMetaData.perfEnv.minAlt.ft).toBe(4000); // 500fpm descent from 5500 in 3min
        expect(leg1.steps[3].altMetaData.perfEnv.maxAlt.ft).toBe(4000); // 500fpm descent from 5500 in 3min
        expect(leg1.steps[4].altMetaData.perfEnv.minAlt.ft).toBe(0); // gnd
        expect(leg1.steps[4].altMetaData.perfEnv.maxAlt.ft).toBe(0); // gnd

        // steep envelope
        expect(leg1.steps[0].altMetaData.perfEnvSteep.minAlt.ft).toBe(0); // gnd
        expect(leg1.steps[0].altMetaData.perfEnvSteep.maxAlt.ft).toBe(0); // gnd
        expect(leg1.steps[1].altMetaData.perfEnvSteep.minAlt.ft).toBe(7000); // gnd + 1000
        expect(leg1.steps[1].altMetaData.perfEnvSteep.maxAlt.ft).toBe(9000); // 1000fpm descent to 6000 in 3min
        expect(leg1.steps[2].altMetaData.perfEnvSteep.minAlt.ft).toBe(5000); // gnd + 1000
        expect(leg1.steps[2].altMetaData.perfEnvSteep.maxAlt.ft).toBe(6000); // 1000fpm descent to 3000 in 3min
        expect(leg1.steps[3].altMetaData.perfEnvSteep.minAlt.ft).toBe(2500); // gnd + 500
        expect(leg1.steps[3].altMetaData.perfEnvSteep.maxAlt.ft).toBe(3000); // 1000fpm descent to 0 in 3min
        expect(leg1.steps[4].altMetaData.perfEnvSteep.minAlt.ft).toBe(0); // gnd
        expect(leg1.steps[4].altMetaData.perfEnvSteep.maxAlt.ft).toBe(0); // gnd
    });


    it('calculates the correct display altitudes for each leg and step', () => {
        // given
        const route1 = MockVerticalRoute1.create();

        // when
        route1.calculate();

        // then
        // leg 1
        const leg1 = route1.legs[0];
        expect(leg1.steps[0].altMetaData.displayAlt.ft).toBe(1000);
        expect(leg1.steps[1].altMetaData.displayAlt.ft).toBe(4500);
        expect(leg1.steps[2].altMetaData.displayAlt.ft).toBe(4500);

        // leg 2
        const leg2 = route1.legs[1];
        expect(leg2.steps[0].altMetaData.displayAlt.ft).toBe(4500);
        expect(leg2.steps[1].altMetaData.displayAlt.ft).toBe(4500);
        expect(leg2.steps[2].altMetaData.displayAlt.ft).toBe(4500);

        // leg 3
        const leg3 = route1.legs[2];
        expect(leg3.steps[0].altMetaData.displayAlt.ft).toBe(4500);
        expect(leg3.steps[1].altMetaData.displayAlt.ft).toBe(3850);
        expect(leg3.steps[2].altMetaData.displayAlt.ft).toBe(1100);
    })
});
