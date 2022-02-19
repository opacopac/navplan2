import VectorTileLayer from 'ol/layer/VectorTile';
import {VectorTile} from 'ol/source';
import {MVT} from 'ol/format';
import {applyStyle} from 'ol-mapbox-style';
import {OlBaseLayer} from './ol-base-layer';


export class SwisstopoLightbaseBaselayer {
    public static readonly STYLE_URL = 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json';


    public static createBaseLayer(attributions: string[]): OlBaseLayer {
        const layer = new VectorTileLayer({
            declutter: true,
            source: new VectorTile({
                format: new MVT(),
                url: 'https://vectortiles.geo.admin.ch/tiles/ch.swisstopo.leichte-basiskarte.vt/v1.0.0/{z}/{x}/{y}.pbf',
                attributions: attributions
            }),
        });

        fetch(this.STYLE_URL).then(function(response) {
            response.json().then(function(glStyle) {
                applyStyle(layer, glStyle, 'swissmaptiles');
            });
        });

        return new OlBaseLayer(layer);
    }
}
