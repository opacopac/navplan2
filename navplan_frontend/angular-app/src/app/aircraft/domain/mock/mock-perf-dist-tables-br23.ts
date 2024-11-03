import { Length } from "../../../geo-physics/domain/model/quantities/length";
import { Temperature } from "../../../geo-physics/domain/model/quantities/temperature";
import { DistancePerformanceTable } from "../model/distance-performance-table";
import { PerformanceTableAltitudeReference } from "../model/performance-table-altitude-reference";
import { PerformanceTableTemperatureReference } from "../model/performance-table-temperature-reference";
import { MockAircraftBr23 } from "./mock-aircraft-br23";
import { MockPerfDistCorrFactorsBr23 } from "./mock-perf-dist-corr-factors-br23";


export class MockPerfDistTablesBr23 {
    public static ALT_STEPS = [
        Length.ofFt(0),
        Length.ofFt(2000),
        Length.ofFt(4000),
        Length.ofFt(6000),
    ];


    public static TEMP_STEPS = [
        Temperature.ofC(-20),
        Temperature.ofC(-10),
        Temperature.ofC(0),
        Temperature.ofC(10),
        Temperature.ofC(20),
    ];


    public static createTakeoffGroundRoll(): DistancePerformanceTable {
        return new DistancePerformanceTable(
            MockAircraftBr23.MTOW,
            PerformanceTableAltitudeReference.FIELD_ALTITUDE,
            this.ALT_STEPS,
            PerformanceTableTemperatureReference.ISA_TEMPERATURE,
            this.TEMP_STEPS,
            this.mapToLength([
                [309, 335, 365, 396, 431],
                [362, 396, 432, 475, 522],
                [431, 476, 526, 584, 652],
                [525, 587, 661, 747, 852]
            ]),
            MockPerfDistCorrFactorsBr23.createTkoffDistCorrFactors()
        );
    }


    public static createTakeoffDistance15ft(): DistancePerformanceTable {
        return new DistancePerformanceTable(
            MockAircraftBr23.MTOW,
            PerformanceTableAltitudeReference.FIELD_ALTITUDE,
            this.ALT_STEPS,
            PerformanceTableTemperatureReference.ISA_TEMPERATURE,
            this.TEMP_STEPS,
            this.mapToLength([
                [400, 438, 479, 523, 570],
                [470, 515, 562, 616, 675],
                [554, 610, 671, 739, 818],
                [663, 735, 818, 915, 1030]
            ]),
            MockPerfDistCorrFactorsBr23.createTkoffDistCorrFactors()
        );
    }


    public static createLandingDistance15ft(): DistancePerformanceTable {
        return new DistancePerformanceTable(
            MockAircraftBr23.MTOW,
            PerformanceTableAltitudeReference.FIELD_ALTITUDE,
            this.ALT_STEPS,
            PerformanceTableTemperatureReference.ISA_TEMPERATURE,
            this.TEMP_STEPS,
            this.mapToLength([
                [362, 376, 391, 405, 419],
                [389, 405, 420, 436, 451],
                [419, 436, 453, 469, 485],
                [452, 470, 488, 505, 523]
            ]),
            MockPerfDistCorrFactorsBr23.createLandDistCorrFactors()
        );
    }


    public static createLandingGroundRoll(): DistancePerformanceTable {
        return new DistancePerformanceTable(
            MockAircraftBr23.MTOW,
            PerformanceTableAltitudeReference.FIELD_ALTITUDE,
            this.ALT_STEPS,
            PerformanceTableTemperatureReference.ISA_TEMPERATURE,
            this.TEMP_STEPS,
            this.mapToLength([
                [136, 141, 146, 151, 157],
                [146, 151, 157, 163, 169],
                [157, 163, 169, 175, 182],
                [169, 175, 182, 189, 196]
            ]),
            MockPerfDistCorrFactorsBr23.createLandDistCorrFactors()
        );
    }


    private static mapToLength(values: number[][]): Length[][] {
        return values.map(row => row.map(value => Length.ofM(value)));
    }
}
