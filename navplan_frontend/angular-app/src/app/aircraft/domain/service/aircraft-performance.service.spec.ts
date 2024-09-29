import { MockDistPerfTablesBr23 } from '../mock/mockDistPerfTablesBr23';
import { Length } from '../../../geo-physics/domain/model/quantities/length';
import { Temperature } from '../../../geo-physics/domain/model/quantities/temperature';
import { AtmosphereService } from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import { MockZeroRwyCorrectionFactors } from '../mock/mock-zero-rwy-correction-factors';
import { AircraftPerformanceService } from './aircraft-performance.service';

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
        const tkoffRoll = AircraftPerformanceService.calcTakeOffGroundRoll(
            elevation,
            qnh,
            temp,
            noCorrectionFactors,
            groundRolldistPerfTable
        );

        // then
        expect(tkoffRoll.m).toBe(365);
    });


    it('it interpolates the ground roll for an intermediate temperature', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel().add(Temperature.ofC(5));
        const groundRolldistPerfTable = MockDistPerfTablesBr23.createTakeoffGroundRoll();
        const noCorrectionFactors = MockZeroRwyCorrectionFactors.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcTakeOffGroundRoll(
            elevation,
            qnh,
            temp,
            noCorrectionFactors,
            groundRolldistPerfTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo((365 + 396) / 2, 0);
    });


    it('it interpolates the ground roll for an intermediate altitude', () => {
        // given
        const elevation = Length.ofFt(1000);
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.calcStandardTemperatureAtAltitude(elevation);
        const groundRolldistPerfTable = MockDistPerfTablesBr23.createTakeoffGroundRoll();
        const noCorrectionFactors = MockZeroRwyCorrectionFactors.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcTakeOffGroundRoll(
            elevation,
            qnh,
            temp,
            noCorrectionFactors,
            groundRolldistPerfTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo((365 + 432) / 2, 0);
    });


    it('it interpolates the ground roll for an intermediate temp & altitude', () => {
        // given
        const elevation = Length.ofFt(1000);
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = Temperature.ofC(AtmosphereService.calcStandardTemperatureAtAltitude(elevation).c + 5);
        const groundRolldistPerfTable = MockDistPerfTablesBr23.createTakeoffGroundRoll();
        const noCorrectionFactors = MockZeroRwyCorrectionFactors.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcTakeOffGroundRoll(
            elevation,
            qnh,
            temp,
            noCorrectionFactors,
            groundRolldistPerfTable
        );

        // then
        const alt0roll = (365 + 396) / 2;
        const alt1roll = (432 + 475) / 2;
        expect(tkoffRoll.m).toBeCloseTo((alt0roll + alt1roll) / 2, 0);
    });
});
