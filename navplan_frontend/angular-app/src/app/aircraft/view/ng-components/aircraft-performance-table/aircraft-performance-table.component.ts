import {Component, Input, OnInit} from '@angular/core';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {DistancePerformanceTable} from '../../../domain/model/distance-performance-table';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';


@Component({
    selector: 'app-aircraft-performance-table',
    templateUrl: './aircraft-performance-table.component.html',
    styleUrls: ['./aircraft-performance-table.component.scss']
})
export class AircraftPerformanceTableComponent implements OnInit {
    @Input() distancePerformanceTable: DistancePerformanceTable;
    @Input() speedUnit: SpeedUnit;
    @Input() weightUnit: WeightUnit;

    protected displayedColumns: string[] = [];

    constructor() {
    }


    ngOnInit() {
        this.displayedColumns = ['altitude', ...this.distancePerformanceTable.temperatureSteps.map(temp => temp.toString())];
    }
}
