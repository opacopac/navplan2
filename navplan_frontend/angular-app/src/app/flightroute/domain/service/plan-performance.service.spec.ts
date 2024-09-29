import { MockDistPerfTablesBr23 } from '../../../aircraft/domain/mock/mockDistPerfTablesBr23';
import { Length } from '../../../geo-physics/domain/model/quantities/length';
import { Temperature } from '../../../geo-physics/domain/model/quantities/temperature';
import { AtmosphereService } from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { MockZeroRwyCorrectionFactors } from '../mock/mock-zero-rwy-correction-factors';
import { PlanPerformanceService } from './plan-performance.service';

describe('PlanPerformanceService', () => {
    beforeEach(() => {
    });


    it('calculates the correct ground roll for standard pressure/temp at sea level without corrections', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel();
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


    it('it interpolates the ground roll for an intermediate temperature', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel().add(Temperature.ofC(5));
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
        expect(tkoffRoll.m).toBe((466 + 506) / 2);
    });


    it('it interpolates the ground roll for an intermediate altitude', () => {
        // given
        const elevation = Length.ofFt(1000);
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.calcStandardTemperatureAtAltitude(elevation);
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
        expect(tkoffRoll.m).toBe((466 + 552) / 2);
    });
});
