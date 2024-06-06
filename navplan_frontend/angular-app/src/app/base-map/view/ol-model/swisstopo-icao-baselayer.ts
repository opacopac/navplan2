import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {OlBaseLayer} from './ol-base-layer';
import {environment} from '../../../../environments/environment';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';


export class SwisstopoIcaoBaselayer {
    static createBaseLayer(): OlBaseLayer {
        const layer = new TileLayer({
            source: new XYZ({
                url: environment.mapTilesIcaoChartUrl + '{z}/{x}/{y}.png',
                maxZoom: 13
            })
        });

        return new OlBaseLayer(MapBaseLayerType.SWISSTOPO_ICAO, layer);
    }
}
