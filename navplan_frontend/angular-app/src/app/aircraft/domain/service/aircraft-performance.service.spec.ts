import {MockPerfDistTablesBr23} from '../mock/mock-perf-dist-tables-br23';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Temperature} from '../../../geo-physics/domain/model/quantities/temperature';
import {AtmosphereService} from '../../../geo-physics/domain/service/meteo/atmosphere.service';
import {MockPerfDistConditionsZero} from '../mock/mock-perf-dist-conditions-zero';
import {AircraftPerformanceService} from './aircraft-performance.service';
import {DistancePerformanceConditions} from '../model/distance-performance-conditions';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';

describe('PlanPerformanceService', () => {
    beforeEach(() => {
    });


    it('calculates the correct ground roll for standard pressure/temp at sea level without corrections', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel();
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = MockPerfDistConditionsZero.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBe(365);
    });


    it('interpolates the ground roll for an intermediate temperature', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel().add(Temperature.ofC(5));
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = MockPerfDistConditionsZero.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo((365 + 396) / 2, 0);
    });


    it('interpolates the ground roll for an intermediate altitude', () => {
        // given
        const elevation = Length.ofFt(1000);
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.calcStandardTemperatureAtAltitude(elevation);
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = MockPerfDistConditionsZero.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo((365 + 432) / 2, 0);
    });


    it('interpolates the ground roll for an intermediate temp & altitude', () => {
        // given
        const elevation = Length.ofFt(1000);
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = Temperature.ofC(AtmosphereService.calcStandardTemperatureAtAltitude(elevation).c + 5);
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = MockPerfDistConditionsZero.create();

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        const alt0roll = (365 + 396) / 2;
        const alt1roll = (432 + 475) / 2;
        expect(tkoffRoll.m).toBeCloseTo((alt0roll + alt1roll) / 2, 0);
    });


    it('calculates the ground roll for a grass rwy', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel();
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = new DistancePerformanceConditions(true, false, Speed.ofZero());

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo(365 * 1.14, 0);
    });


    it('calculates the landing roll for a wet rwy', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel();
        const perfDistTable = MockPerfDistTablesBr23.createLandingGroundRoll();
        const perfDistConditions = new DistancePerformanceConditions(false, true, Speed.ofZero());

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo(146 * 1.15, 0);
    });


    it('calculates the takeoff roll for a 10 kt headwind', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel();
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = new DistancePerformanceConditions(false, false, Speed.ofKt(10));

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo(365 * 0.7, 0);
    });


    it('calculates the takeoff roll for a 10 kt tailwind', () => {
        // given
        const elevation = Length.ofZero();
        const qnh = AtmosphereService.getStandardPressureAtSeaLevel();
        const temp = AtmosphereService.getStandardTemperatureAtSeaLevel();
        const perfDistTable = MockPerfDistTablesBr23.createTakeoffGroundRoll();
        const perfDistConditions = new DistancePerformanceConditions(false, false, Speed.ofKt(-10));

        // when
        const tkoffRoll = AircraftPerformanceService.calcDistance(
            elevation,
            qnh,
            temp,
            perfDistConditions,
            perfDistTable
        );

        // then
        expect(tkoffRoll.m).toBeCloseTo(365 * 1.4, 0);
    });
});
