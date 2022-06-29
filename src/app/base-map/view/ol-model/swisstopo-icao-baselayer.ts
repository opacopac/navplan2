import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';
import {environment} from '../../../../environments/environment';


export class SwisstopoIcaoBaselayer {
    static createBaseLayer(attributions: string[]): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: environment.mapTilesIcaoChartUrl + '{z}/{x}/{y}.png',
                attributions: attributions,
                maxZoom: 13
            })
        });

        return new OlBaseLayer(layer);
    }
}
