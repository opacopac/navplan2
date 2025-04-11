import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {DistancePerformanceTable} from '../../../domain/model/distance-performance-table';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {TemperatureUnit} from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {PerformanceTableAltitudeReference} from '../../../domain/model/performance-table-altitude-reference';
import {MatTableModule} from '@angular/material/table';
import {
    AircraftPerformanceCorrectionFactorsComponent
} from '../aircraft-performance-correction-factors/aircraft-performance-correction-factors.component';


@Component({
    selector: 'app-aircraft-performance-table',
    standalone: true,
    imports: [
        MatTableModule,
        AircraftPerformanceCorrectionFactorsComponent
    ],
    templateUrl: './aircraft-performance-table.component.html',
    styleUrls: ['./aircraft-performance-table.component.scss']
})
export class AircraftPerformanceTableComponent implements OnInit {
    @Input() distancePerformanceTable: DistancePerformanceTable;
    @Input() speedUnit: SpeedUnit;
    @Input() weightUnit: WeightUnit;
    @Input() temperatureUnit: TemperatureUnit;
    @Input() distanceUnit: LengthUnit;
    @Input() altitudeUnit: LengthUnit;

    protected displayedColumns: string[] = [];

    constructor() {
    }


    ngOnInit() {
        this.calcDisplayedColumns();
    }


    private calcDisplayedColumns() {
        if (!this.distancePerformanceTable || !this.distancePerformanceTable.distanceValues
            || this.distancePerformanceTable.distanceValues.length < 1
        ) {
            return;
        }

        this.displayedColumns = ['altitudes'];

        for (let i = 0; i < this.distancePerformanceTable.distanceValues[0].length; i++) {
            this.displayedColumns.push('temp_' + i);
        }
    }


    protected getProfileName(): string {
        return this.distancePerformanceTable.profileName;
    }


    protected getTemperatureTitle(colIdx: number): string {
        if (colIdx === 0) {
            switch (this.distancePerformanceTable.altitudeReference) {
                case PerformanceTableAltitudeReference.FIELD_ALTITUDE:
                    return 'Field Alt.';
                case PerformanceTableAltitudeReference.PRESSURE_ALTITUDE:
                    return 'Pressure Alt.';
                default:
                    throw new Error('unknown altitude reference');
            }
        }

        return this.distancePerformanceTable
            .temperatureSteps[colIdx - 1]
            .getValueAndUnit(this.temperatureUnit, 0);
    }


    protected getAltitudeTitle(rowIdx: number): string {
        return this.distancePerformanceTable
            .altitudeSteps[rowIdx]
            .getValueAndUnit(this.altitudeUnit, 0);
    }


    protected getDistanceText(rowIdx: number, colIdx: number): string {
        if (colIdx === 0) {
            return this.getAltitudeTitle(rowIdx);
        }

        return this.distancePerformanceTable
            .distanceValues[rowIdx][colIdx - 1]
            .getValueAndUnit(this.distanceUnit, 0);
    }
}
