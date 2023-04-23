import { MeteoDwdLayer } from '../../domain/model/meteo-dwd-layer';


export class RestMeteoDwdLayerConverter {
    public static toRest(layer: MeteoDwdLayer): string {
        switch (layer) {
            case MeteoDwdLayer.WeatherLayer: return 'CLOUDS';
            case MeteoDwdLayer.WindLayer: return 'WIND';
        }
    }


    public static fromRest(restLayer: string): MeteoDwdLayer {
        switch (restLayer) {
            case 'CLOUDS': return MeteoDwdLayer.WeatherLayer;
            case 'WIND': return MeteoDwdLayer.WindLayer;
        }
    }
}
