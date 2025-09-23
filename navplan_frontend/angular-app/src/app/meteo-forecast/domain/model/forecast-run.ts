import {WeatherModelConfig} from './weather-model-config';
import {StringnumberHelper} from '../../../system/domain/service/stringnumber/stringnumber-helper';
import {TimeUnit} from '../../../geo-physics/domain/model/quantities/time-unit';
import {WeatherModelType} from './weather-model-type';


export class ForecastRun {
    public constructor(
        public startTime: Date,
        public model: WeatherModelConfig
    ) {
    }


    public getName(): string {
        return this.startTime.getUTCFullYear()
            + StringnumberHelper.zeroPad(this.startTime.getUTCMonth() + 1, 2)
            + StringnumberHelper.zeroPad(this.startTime.getUTCDate(), 2)
            + StringnumberHelper.zeroPad(this.startTime.getUTCHours(), 2);
    }


    public getStepDateTime(step: number): Date {
        return new Date(this.startTime.getTime() + step * this.model.stepLength.getValue(TimeUnit.MS));
    }


    public getModelName(): string {
        switch (this.model.modelType) {
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


    public getProviderName(): string {
        switch (this.model.modelType) {
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


    public getProviderUrl(): string {
        switch (this.model.modelType) {
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


    public getRunName(): string {
        return this.startTime.getUTCFullYear() + '-'
            + StringnumberHelper.zeroPad(this.startTime.getUTCMonth() + 1, 2) + '-'
            + StringnumberHelper.zeroPad(this.startTime.getUTCDate(), 2) + ' '
            + StringnumberHelper.zeroPad(this.startTime.getUTCHours(), 2) + ':00 UTC';
    }
}
