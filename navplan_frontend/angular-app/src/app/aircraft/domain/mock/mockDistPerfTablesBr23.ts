import { Length } from "../../../geo-physics/domain/model/quantities/length";
import { Temperature } from "../../../geo-physics/domain/model/quantities/temperature";
import { DistancePerformanceTable } from "../model/distance-performance-table";
import { PerformanceTableAltitudeReference } from "../model/performance-table-altitude-reference";
import { PerformanceTableTemperatureReference } from "../model/performance-table-temperature-reference";
import { MockAircraftBr23 } from "./mockAircraftBr23";


export class MockDistPerfTablesBr23 {
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
                [395, 428, 466, 506, 550],
                [462, 506, 552, 606, 666],
                [550, 608, 672, 746, 832],
                [670, 749, 844, 954, 1088]
            ]),
            null
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
                [511, 559, 612, 668, 728],
                [600, 658, 718, 787, 862],
                [707, 779, 857, 944, 1044],
                [847, 938, 1044, 1168, 1315]
            ]),
            null
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
                [453, 470, 489, 507, 524],
                [487, 507, 525, 545, 564],
                [524, 545, 567, 587, 607],
                [565, 588, 610, 632, 654]
            ]),
            null
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
                [170, 176, 183, 189, 196],
                [183, 189, 196, 204, 211],
                [196, 204, 211, 219, 228],
                [211, 219, 228, 236, 245]
            ]),
            null
        );
    }


    private static mapToLength(values: number[][]): Length[][] {
        return values.map(row => row.map(value => Length.ofM(value)));
    }
}
