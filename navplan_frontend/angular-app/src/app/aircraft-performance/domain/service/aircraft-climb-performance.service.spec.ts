import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';
import {AircraftClimbPerformanceService} from './aircraft-climb-performance.service';
import {Time} from '../../../geo-physics/domain/model/quantities/time';


describe('AircraftClimbPerformanceService', () => {
    beforeEach(() => {
    });


    it('calculates the correct absolut ceiling', () => {
        // given
        const rocSeaLevel = Speed.ofFpm(721);
        const serviceCeiling = Length.ofFt(13500);

        // when
        const absoluteCeiling = AircraftClimbPerformanceService.calcAbsoluteCeiling(rocSeaLevel, serviceCeiling);

        // then
        expect(absoluteCeiling.ft).toBeGreaterThan(15000);
        expect(absoluteCeiling.ft).toBeLessThan(15750);
    });


    it('calculates the correct flight time', () => {
        // given
        const legDist = Length.ofNm(10);
        const speed = Speed.ofKt(100);

        // when
        const flightTime = AircraftClimbPerformanceService.calcFlightTime(legDist, speed);

        // then
        expect(flightTime.min).toBe(6);
    });


    it('should calculate the correct climb starting altitude', () => {
        // given
        const targetAlt = Length.ofFt(5000);
        const climbTime = Time.ofMin(8.5);
        const rocSeaLevel = Speed.ofFpm(700);
        const serviceCeiling = Length.ofFt(13000);

        // when
        const startingAlt = AircraftClimbPerformanceService.calcClimbStartingAlt(targetAlt, climbTime, rocSeaLevel, serviceCeiling);

        // then
        expect(startingAlt.ft).toBeGreaterThan(-200);
        expect(startingAlt.ft).toBeLessThan(200);
    });


    it('should calculate the correct climb starting altitude #2', () => {
        // given
        const targetAlt = Length.ofFt(12000);
        const climbTime = Time.ofMin(25.5);
        const rocSeaLevel = Speed.ofFpm(700);
        const serviceCeiling = Length.ofFt(13000);

        // when
        const startingAlt = AircraftClimbPerformanceService.calcClimbStartingAlt(targetAlt, climbTime, rocSeaLevel, serviceCeiling);

        // then
        expect(startingAlt.ft).toBeGreaterThan(4800);
        expect(startingAlt.ft).toBeLessThan(5200);
    });


    it('should calculate the correct descent starting altitude', () => {
        // given
        const targetAlt = Length.ofFt(5000);
        const descentTime = Time.ofMin(10);
        const rod = Speed.ofFpm(500);

        // when
        const startingAlt = AircraftClimbPerformanceService.calcDescentStartingAlt(targetAlt, descentTime, rod);

        // then
        expect(startingAlt.ft).toBe(10000);
    });
});
