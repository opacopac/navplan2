import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {DistancePerformanceTable} from '../../../domain/model/distance-performance-table';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import { TemperatureUnit } from '../../../../geo-physics/domain/model/quantities/temperature-unit';
import { Temperature } from '../../../../geo-physics/domain/model/quantities/temperature';
import { Length } from '../../../../geo-physics/domain/model/quantities/length';
import { LengthUnit } from '../../../../geo-physics/domain/model/quantities/length-unit';


@Component({
    selector: 'app-aircraft-performance-table',
    templateUrl: './aircraft-performance-table.component.html',
    styleUrls: ['./aircraft-performance-table.component.scss']
})
export class AircraftPerformanceTableComponent implements OnInit {
    @Input() distancePerformanceTable: DistancePerformanceTable;
    @Input() speedUnit: SpeedUnit;
    @Input() weightUnit: WeightUnit;
    @Input() temperatureUnit: TemperatureUnit;
    @Input() distanceUnit: LengthUnit;
    
    protected displayedColumns: string[] = [];
    protected displayedValues: string[][] = [];

    constructor() {
    }


    ngOnInit() {
        this.calcDisplayedColumns;
        this.calcDisplayedValues;
    }


    private calcDisplayedColumns() {
        this.displayedColumns = ['altitudes'];

        for (let i = 0; i < this.distancePerformanceTable.distanceValues.length; i++) {
            this.displayedColumns.push['temp_' + i];
        }
    }


    private calcDisplayedValues() {
        this.displayedValues = [
            ['1', '2', '3', '4', '5'],
            ['1', '2', '3', '4', '5'],
            ['1', '2', '3', '4', '5']
        ]
    }


    protected getTemperatureTitle(index: number): string {     
        if (index = 0) {
            return '';
        }           

        return this.distancePerformanceTable
            .temperatureSteps[index - 1]
            .getValue(this.temperatureUnit) + Temperature.getUnitString(this.temperatureUnit)
    }


    protected getAltitudeTitle(index: number): string {     
        if (index = 0) {
            return '';
        }           
        
        return this.distancePerformanceTable
            .altitudeSteps[index - 1]
            .getValue(this.distanceUnit) + Length.getUnitString(this.distanceUnit)
    }


    protected getDistanceText(distance: Length): string {
        return distance.getValue(this.distanceUnit) + Length.getUnitString(this.distanceUnit);
    }
}
