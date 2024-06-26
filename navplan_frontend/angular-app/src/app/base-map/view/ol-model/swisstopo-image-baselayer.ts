import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';


export class SwisstopoImageBaselayer {
    static createBaseLayer(): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
            })
        });

        return new OlBaseLayer(MapBaseLayerType.SWISSTOPO_IMAGE, layer);
    }
}
