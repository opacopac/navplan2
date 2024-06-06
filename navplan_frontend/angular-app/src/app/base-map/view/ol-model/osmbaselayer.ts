import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';


export class Osmbaselayer {
    static createBaseLayer(): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            })
        });

        return new OlBaseLayer(MapBaseLayerType.OSM, layer);
    }
}
