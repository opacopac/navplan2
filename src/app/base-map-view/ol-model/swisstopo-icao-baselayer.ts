import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';


export class SwisstopoIcaoBaselayer {
    static createBaseLayer(attributions: string[]): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: 'http://localhost/navplan2/maptiles/icao_ch_aero/{z}/{x}/{y}.png',
                attributions: attributions
            })
        });

        return new OlBaseLayer(layer);
    }
}
