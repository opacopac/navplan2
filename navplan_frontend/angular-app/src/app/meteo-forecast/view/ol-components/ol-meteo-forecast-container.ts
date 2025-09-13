import {Observable, Subscription} from 'rxjs';
import {WindInfo} from '../../domain/model/wind-info';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlMeteoForecastWindIconLayer} from './ol-meteo-forecast-wind-icon-layer';
import {OlMeteoForecastWeatherIconLayer} from './ol-meteo-forecast-weather-icon-layer';
import {WeatherInfo} from '../../domain/model/weather-info';
import {OlMeteoForecastMapTileLayer} from './ol-meteo-forecast-map-tile-layer';
import {MeteoForecastLayer} from '../../domain/model/meteo-forecast-layer';


export class OlMeteoForecastContainer {
    private readonly showLayerSubscription: Subscription;
    private readonly mapTilesUrlSubscription: Subscription;
    private readonly weatherIconLayer: OlMeteoForecastWeatherIconLayer;
    private readonly windIconLayer: OlMeteoForecastWindIconLayer;


    constructor(
        private readonly meteoFcBgLayer: OlMeteoForecastMapTileLayer,
        private readonly meteoFcWeatherIconLayer: OlVectorLayer,
        private readonly meteoFcWindIconLayer: OlVectorLayer,
        private readonly showLayer$: Observable<MeteoForecastLayer>,
        private readonly meteoFcWeatherValues: Observable<WeatherInfo[]>,
        private readonly meteoFcWindValues$: Observable<WindInfo[]>,
        private readonly meteoFcMapTilesUrl$: Observable<string>
    ) {
        this.showLayerSubscription = this.showLayer$.subscribe(showLayer => {
            this.showLayers(showLayer);
        });

        this.mapTilesUrlSubscription = this.meteoFcMapTilesUrl$.subscribe(url => {
            this.meteoFcBgLayer.setUrl(url);
        });

        this.weatherIconLayer = new OlMeteoForecastWeatherIconLayer(
            this.meteoFcWeatherIconLayer,
            this.meteoFcWeatherValues
        );

        this.windIconLayer = new OlMeteoForecastWindIconLayer(
            this.meteoFcWindIconLayer,
            this.meteoFcWindValues$
        );
    }


    public destroy() {
        this.showLayerSubscription.unsubscribe();
        this.mapTilesUrlSubscription.unsubscribe();

        this.showLayers(undefined);

        this.weatherIconLayer.destroy();
        this.windIconLayer.destroy();
    }


    private showLayers(showLayer: MeteoForecastLayer) {
        switch (showLayer) {
            case MeteoForecastLayer.WeatherLayer: {
                this.meteoFcWeatherIconLayer.setVisible(true);
                this.meteoFcWindIconLayer.setVisible(false);
                this.meteoFcBgLayer.setVisible(true);
                break;
            }
            case MeteoForecastLayer.WindLayer: {
                this.meteoFcWeatherIconLayer.setVisible(false);
                this.meteoFcWindIconLayer.setVisible(true);
                this.meteoFcBgLayer.setVisible(true);
                break;
            }
            default: {
                this.meteoFcWeatherIconLayer.setVisible(false);
                this.meteoFcWindIconLayer.setVisible(false);
                this.meteoFcBgLayer.setVisible(false);
                break;
            }
        }
    }
}
