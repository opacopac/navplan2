import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {WeatherModelConfig} from '../../../domain/model/weather-model-config';


export interface ListEntry {
    startTime: Date;
    model: WeatherModelConfig;

    getModelName(): string;

    getRunName(): string;

    getProviderName(): string;

    getProviderUrl(): string;
}


@Component({
    selector: 'app-meteo-forecast-picker-list',
    imports: [
        CommonModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
    ],
    templateUrl: './meteo-forecast-picker-list.component.html',
    styleUrls: ['./meteo-forecast-picker-list.component.scss']
})
export class MeteoForecastPickerListComponent implements OnInit, OnChanges {
    @Input() forecastRunList: ForecastRun[];
    @Input() currentFcRun: ForecastRun;
    @Output() onSelectFcRunClick = new EventEmitter<ForecastRun>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    protected dataSource: MatTableDataSource<ListEntry>;
    protected visibleColumns = ['model', 'run', 'provider'];

    protected readonly ButtonColor = ButtonColor;


    constructor() {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.dataSource = new MatTableDataSource<ListEntry>(this.forecastRunList);
        this.dataSource.paginator = this.paginator;
    }
}
