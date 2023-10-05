import {Observable, Subscription} from 'rxjs';
import {WindInfo} from '../../domain/model/wind-info';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlDwdForecastWindIconLayer} from './ol-dwd-forecast-wind-icon-layer';
import {OlDwdForecastWeatherIconLayer} from './ol-dwd-forecast-weather-icon-layer';
import {WeatherInfo} from '../../domain/model/weather-info';
import {OlDwdForecastMapTileLayer} from './ol-dwd-forecast-map-tile-layer';
import {MeteoDwdLayer} from '../../domain/model/meteo-dwd-layer';


export class OlDwdForecastContainer {
    private readonly showLayerSubscription: Subscription;
    private readonly mapTilesUrlSubscription: Subscription;
    private readonly weatherIconLayer: OlDwdForecastWeatherIconLayer;
    private readonly windIconLayer: OlDwdForecastWindIconLayer;


    constructor(
        private readonly dwdBgLayer: OlDwdForecastMapTileLayer,
        private readonly dwdWeatherIconLayer: OlVectorLayer,
        private readonly dwdWindIconLayer: OlVectorLayer,
        private readonly showLayer$: Observable<MeteoDwdLayer>,
        private readonly meteoDwdWeatherValues: Observable<WeatherInfo[]>,
        private readonly meteoDwdWindValues$: Observable<WindInfo[]>,
        private readonly meteoDwdMapTilesUrl$: Observable<string>
    ) {
        this.showLayerSubscription = this.showLayer$.subscribe(showLayer => {
            this.showLayers(showLayer);
        });

        this.mapTilesUrlSubscription = this.meteoDwdMapTilesUrl$.subscribe(url => {
            this.dwdBgLayer.setUrl(url);
        });

        this.weatherIconLayer = new OlDwdForecastWeatherIconLayer(
            this.dwdWeatherIconLayer,
            this.meteoDwdWeatherValues
        );

        this.windIconLayer = new OlDwdForecastWindIconLayer(
            this.dwdWindIconLayer,
            this.meteoDwdWindValues$
        );
    }


    public destroy() {
        this.showLayerSubscription.unsubscribe();
        this.mapTilesUrlSubscription.unsubscribe();

        this.showLayers(undefined);

        this.weatherIconLayer.destroy();
        this.windIconLayer.destroy();
    }


    private showLayers(showLayer: MeteoDwdLayer) {
        switch (showLayer) {
            case MeteoDwdLayer.WeatherLayer: {
                this.dwdWeatherIconLayer.setVisible(true);
                this.dwdWindIconLayer.setVisible(false);
                this.dwdBgLayer.setVisible(true);
                break;
            }
            case MeteoDwdLayer.WindLayer: {
                this.dwdWeatherIconLayer.setVisible(false);
                this.dwdWindIconLayer.setVisible(true);
                this.dwdBgLayer.setVisible(true);
                break;
            }
            default: {
                this.dwdWeatherIconLayer.setVisible(false);
                this.dwdWindIconLayer.setVisible(false);
                this.dwdBgLayer.setVisible(false);
                break;
            }
        }
    }
}
