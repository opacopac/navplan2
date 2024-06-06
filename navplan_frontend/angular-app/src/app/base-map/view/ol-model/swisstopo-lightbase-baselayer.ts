import {VectorTile} from 'ol/source';
import {OlBaseLayer} from './ol-base-layer';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';
import VectorTileLayer from 'ol/layer/VectorTile';
import {MVT} from 'ol/format';


export class SwisstopoLightbaseBaselayer {
    public static readonly STYLE_URL = 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json';


    public static createBaseLayer(): OlBaseLayer {
        const layer = new VectorTileLayer({
            declutter: true,
            source: new VectorTile({
                format: new MVT(),
                url: 'https://vectortiles.geo.admin.ch/tiles/ch.swisstopo.leichte-basiskarte.vt/v1.0.0/{z}/{x}/{y}.pbf',
            }),
        });

        fetch(this.STYLE_URL).then(function (response) {
            response.json().then(function (glStyle) {
                // applyStyle(layer, glStyle, 'swissmaptiles');
            });
        });

        return new OlBaseLayer(MapBaseLayerType.SWISSTOPO_LIGHTBASE, layer);
    }
}
