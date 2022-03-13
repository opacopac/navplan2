import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';


export class SwisstopoGliderBaselayer {
    static createBaseLayer(attributions: string[]): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: 'http://localhost/navplan2/maptiles/icao_ch_glider/{z}/{x}/{y}.png',
                attributions: attributions
            })
        });

        return new OlBaseLayer(layer);
    }
}