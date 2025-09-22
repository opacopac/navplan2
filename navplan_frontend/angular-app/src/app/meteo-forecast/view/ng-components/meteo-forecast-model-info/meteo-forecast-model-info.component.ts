import {Component, Input, OnInit} from '@angular/core';
import {ForecastRun} from '../../../domain/model/forecast-run';


@Component({
    selector: 'app-meteo-forecast-model-info',
    imports: [],
    templateUrl: './meteo-forecast-model-info.component.html',
    styleUrls: ['./meteo-forecast-model-info.component.scss']
})
export class MeteoForecastModelInfoComponent implements OnInit {
    @Input() currentForecastRun: ForecastRun;


    constructor() {
    }


    ngOnInit(): void {
    }
}
