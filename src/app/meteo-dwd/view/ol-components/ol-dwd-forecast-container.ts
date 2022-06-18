import {Observable, Subscription} from 'rxjs';
import {OlDwdForecastWindTileLayer} from './ol-dwd-forecast-wind-tile-layer';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindInfo} from '../../domain/model/wind-info';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlDwdForecastWindIconLayer} from './ol-dwd-forecast-wind-icon-layer';
import {OlDwdForecastWeatherTileLayer} from './ol-dwd-forecast-weather-tile-layer';
import {OlDwdForecastWeatherIconLayer} from './ol-dwd-forecast-weather-icon-layer';
import {WeatherInfo} from '../../domain/model/weather-info';


export class OlDwdForecastContainer {
    private readonly showWeatherForecastSubscription: Subscription;
    private readonly showWindForecastSubscription: Subscription;
    private readonly meteoDwdSelectedIntervalSubscription: Subscription;
    private readonly weatherIconLayer: OlDwdForecastWeatherIconLayer;
    private readonly windIconLayer: OlDwdForecastWindIconLayer;


    constructor(
        private readonly dwdWeatherBgLayer: OlDwdForecastWeatherTileLayer,
        private readonly dwdWeatherIconLayer: OlVectorLayer,
        private readonly dwdWindBgLayer: OlDwdForecastWindTileLayer,
        private readonly dwdWindIconLayer: OlVectorLayer,
        private readonly showWeatherForecast$: Observable<boolean>,
        private readonly showWindForecast$: Observable<boolean>,
        private readonly selectedInterval$: Observable<number>,
        private readonly meteoDwdWeatherGrid$: Observable<ValueGrid<WeatherInfo>>,
        private readonly meteoDwdWindGrid$: Observable<ValueGrid<WindInfo>>
    ) {
        this.showWeatherForecastSubscription = this.showWeatherForecast$.subscribe(showWeatherForecast => {
            this.showWeatherLayers(showWeatherForecast);
        });

        this.showWindForecastSubscription = this.showWindForecast$.subscribe(showWindForecast => {
            this.showWindLayers(showWindForecast);
        });

        this.meteoDwdSelectedIntervalSubscription = this.selectedInterval$.subscribe(interval => {
            this.dwdWeatherBgLayer.setInterval(interval);
            this.dwdWindBgLayer.setInterval(interval);
        });

        this.weatherIconLayer = new OlDwdForecastWeatherIconLayer(
            this.dwdWeatherIconLayer,
            this.meteoDwdWeatherGrid$
        );

        this.windIconLayer = new OlDwdForecastWindIconLayer(
            this.dwdWindIconLayer,
            this.meteoDwdWindGrid$
        );
    }


    public destroy() {
        this.showWeatherLayers(false);
        this.showWindLayers(false);
        this.showWindForecastSubscription.unsubscribe();
        this.meteoDwdSelectedIntervalSubscription.unsubscribe();
        this.weatherIconLayer.destroy();
        this.windIconLayer.destroy();
    }


    private showWeatherLayers(isVisible: boolean) {
        this.dwdWeatherBgLayer.setVisible(isVisible);
        this.dwdWeatherIconLayer.setVisible(isVisible);
    }


    private showWindLayers(isVisible: boolean) {
        this.dwdWindBgLayer.setVisible(isVisible);
        this.dwdWindIconLayer.setVisible(isVisible);
    }
}
