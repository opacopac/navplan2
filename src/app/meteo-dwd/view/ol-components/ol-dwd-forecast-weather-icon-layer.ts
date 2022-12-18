import {Observable, Subscription} from 'rxjs';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {WeatherInfo} from '../../domain/model/weather-info';
import {OlDwdForecastWeatherIcon} from './ol-dwd-forecast-weather-icon';


export class OlDwdForecastWeatherIconLayer {
    private readonly weatherGridSubscription: Subscription;


    constructor(
        private readonly weatherLayer: OlVectorLayer,
        wwValues$: Observable<WeatherInfo[]>
    ) {
        this.weatherGridSubscription = wwValues$.subscribe((wwGrid) => {
            this.clearFeatures();
            this.drawFeatures(wwGrid);
        });
    }


    public destroy() {
        this.weatherGridSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(weatherValues: WeatherInfo[]) {
        if (weatherValues) {
            weatherValues.forEach(weatherInfo => {
                OlDwdForecastWeatherIcon.draw(
                    weatherInfo,
                    weatherInfo.pos,
                    Angle.createZero(), // TODO
                    this.weatherLayer
                );
            });
        }
    }


    private clearFeatures() {
        this.weatherLayer.clear();
    }
}
