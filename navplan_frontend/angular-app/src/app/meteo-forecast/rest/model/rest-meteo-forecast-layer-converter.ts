import {MeteoForecastLayer} from '../../domain/model/meteo-forecast-layer';


export class RestMeteoForecastLayerConverter {
    public static toRest(layer: MeteoForecastLayer): string {
        switch (layer) {
            case MeteoForecastLayer.WeatherLayer: return 'CLOUDS';
            case MeteoForecastLayer.WindLayer: return 'WIND';
        }
    }


    public static fromRest(restLayer: string): MeteoForecastLayer {
        switch (restLayer) {
            case 'CLOUDS': return MeteoForecastLayer.WeatherLayer;
            case 'WIND': return MeteoForecastLayer.WindLayer;
        }
    }
}
