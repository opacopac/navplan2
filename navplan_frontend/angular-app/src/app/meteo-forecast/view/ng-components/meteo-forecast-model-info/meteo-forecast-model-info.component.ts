import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ForecastRun} from '../../../domain/model/forecast-run';


@Component({
    selector: 'app-meteo-forecast-model-info',
    imports: [],
    templateUrl: './meteo-forecast-model-info.component.html',
    styleUrls: ['./meteo-forecast-model-info.component.scss']
})
export class MeteoForecastModelInfoComponent implements OnInit {
    @Input() currentForecastRun: ForecastRun;
    @Output() changeModelClicked: EventEmitter<void> = new EventEmitter<void>();


    constructor() {
    }


    ngOnInit(): void {
    }


    protected getModelName(): string {
        return this.currentForecastRun
            ? this.currentForecastRun.getModelName()
            : '';
    }


    protected getProviderName(): string {
        return this.currentForecastRun
            ? this.currentForecastRun.getProviderName()
            : '';
    }


    protected getProviderUrl(): string {
        return this.currentForecastRun
            ? this.currentForecastRun.getProviderUrl()
            : '';
    }


    protected getRunName(): string {
        return this.currentForecastRun
            ? this.currentForecastRun.getRunName()
            : '';
    }


    protected onChangeModelClick(): void {
        this.changeModelClicked.emit();
    }
}
