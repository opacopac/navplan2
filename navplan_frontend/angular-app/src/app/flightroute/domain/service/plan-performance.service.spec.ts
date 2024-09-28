import { MockDistPerfTablesBr23 } from '../../../aircraft/domain/mock/mockDistPerfTablesBr23';
import { Length } from '../../../geo-physics/domain/model/quantities/length';
import { AtmosphereService } from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { MockZeroRwyCorrectionFactors } from '../mock/mock-zero-rwy-correction-factors';
import { PlanPerformanceService } from './plan-performance.service';

describe('PlanPerformanceService', () => {
    beforeEach(() => {
    });


    it('calculates the correct ground roll for standard pressure at sea leve without corrections', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressure();
        const temp = AtmosphereService.getStandardTemperature();
        const groundRolldistPerfTable = MockDistPerfTablesBr23.createTakeoffGroundRoll();
        const noCorrectionFactors = MockZeroRwyCorrectionFactors.create();

        // when
        const tkoffRoll = PlanPerformanceService.calcTakeOffGroundRoll(
            elevation,
            qnh,
            temp,
            noCorrectionFactors,
            groundRolldistPerfTable
        );

        // then
        expect(tkoffRoll.m).toBe(466);
    });
});
