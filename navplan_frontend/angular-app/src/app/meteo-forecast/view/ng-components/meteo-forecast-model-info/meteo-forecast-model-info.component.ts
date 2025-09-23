import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ForecastRun} from '../../../domain/model/forecast-run';
import {WeatherModelType} from '../../../domain/model/weather-model-type';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';


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
        if (!this.currentForecastRun) {
            return '';
        }

        switch (this.currentForecastRun.model.modelType) {
            case WeatherModelType.ICON_D2:
                return 'ICON-D2';
            case WeatherModelType.ICON_EU:
                return 'ICON-EU';
            case WeatherModelType.ICON:
                return 'ICON Global';
            case WeatherModelType.ICON_CH1:
                return 'ICON-CH1-EPS';
            default:
                return '';
        }
    }


    protected getProviderName(): string {
        if (!this.currentForecastRun) {
            return '';
        }

        switch (this.currentForecastRun.model.modelType) {
            case WeatherModelType.ICON_D2:
            case WeatherModelType.ICON_EU:
            case WeatherModelType.ICON:
                return 'DWD';
            case WeatherModelType.ICON_CH1:
                return 'MeteoSwiss';
            default:
                return '';
        }
    }


    protected getProviderUrl(): string {
        if (!this.currentForecastRun) {
            return '';
        }

        switch (this.currentForecastRun.model.modelType) {
            case WeatherModelType.ICON_D2:
                return 'https://www.dwd.de/DE/forschung/wettervorhersage/num_modellierung/01_num_vorhersagemodelle/regionalmodell_icon_d2.html';
            case WeatherModelType.ICON:
            case WeatherModelType.ICON_EU:
                return 'https://www.dwd.de/DE/forschung/wettervorhersage/num_modellierung/01_num_vorhersagemodelle/icon_beschreibung.html';
            case WeatherModelType.ICON_CH1:
                return 'https://www.meteoswiss.admin.ch/weather/warning-and-forecasting-systems/icon-forecasting-systems.html';
            default:
                return '';
        }
    }


    protected getRunName(): string {
        if (!this.currentForecastRun) {
            return '';
        }

        const startTime = this.currentForecastRun.startTime;

        return startTime.getUTCFullYear() + '-'
            + StringnumberHelper.zeroPad(startTime.getUTCMonth() + 1, 2) + '-'
            + StringnumberHelper.zeroPad(startTime.getUTCDate(), 2) + ' '
            + StringnumberHelper.zeroPad(startTime.getUTCHours(), 2) + ':00 UTC';
    }


    protected onChangeModelClick(): void {
        this.changeModelClicked.emit();
    }
}
