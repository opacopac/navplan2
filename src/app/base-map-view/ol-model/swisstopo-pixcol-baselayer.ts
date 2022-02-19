import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';


export class SwisstopoPixcolBaselayer {
    static createBaseLayer(attributions: string[]): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
                attributions: attributions
            })
        });

        return new OlBaseLayer(layer);
    }
}
