import {Component, Input, OnInit} from '@angular/core';
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
                return 'DWD ICON-D2';
            case WeatherModelType.ICON_EU:
                return 'DWD ICON-EU';
            case WeatherModelType.ICON:
                return 'DWD ICON Global';
            case WeatherModelType.ICON_CH1:
                return 'MeteoSwiss ICON-CH1-EPS';
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
}
