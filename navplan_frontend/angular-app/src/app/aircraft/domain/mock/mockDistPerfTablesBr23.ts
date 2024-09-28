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


    public static createGroundRoll(): DistancePerformanceTable {
        return new DistancePerformanceTable(
            MockAircraftBr23.MTOW,
            PerformanceTableAltitudeReference.FIELD_ALTITUDE,
            this.ALT_STEPS,
            PerformanceTableTemperatureReference.ISA_TEMPERATURE,
            this.TEMP_STEPS,
            this.mapToLength([
                [170, 176, 183, 189, 196],
                [183, 189, 196, 204, 211]
            ]),
            null
        );
    }


    private static mapToLength(values: number[][]): Length[][] {
        return values.map(row => row.map(value => Length.ofM(value)));
    }
}
