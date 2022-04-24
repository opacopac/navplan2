import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlTileLayer} from '../../base-map-view/ol-model/ol-tile-layer';


export class OlDwdForecastTilelayer {
    public static create(): OlTileLayer {
        const layer = new TileLayer({
            opacity: 0.8,
            source: new XYZ({
                url: 'http://localhost/navplan2/maptiles/meteo_test/{z}/{x}/{y}.png',
                maxZoom: 7,
                // attributions: attributions
            })
        });


        return new OlTileLayer(layer);
    }
}
