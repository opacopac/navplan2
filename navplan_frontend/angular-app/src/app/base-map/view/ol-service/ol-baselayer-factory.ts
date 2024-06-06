import {Osmbaselayer} from '../ol-model/osmbaselayer';
import {Opentopobaselayer} from '../ol-model/opentopobaselayer';
import {Mapboxbaselayer} from '../ol-model/mapboxbaselayer';
import {Mapzenbaselayer} from '../ol-model/mapzenbaselayer';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';
import {SwisstopoImageBaselayer} from '../ol-model/swisstopo-image-baselayer';
import {SwisstopoPixcolBaselayer} from '../ol-model/swisstopo-pixcol-baselayer';
import {OlBaseLayer} from '../ol-model/ol-base-layer';
import {SwisstopoLightbaseBaselayer} from '../ol-model/swisstopo-lightbase-baselayer';
import {SwisstopoIcaoBaselayer} from '../ol-model/swisstopo-icao-baselayer';
import {SwisstopoGliderBaselayer} from '../ol-model/swisstopo-glider-baselayer';


export class OlBaselayerFactory {
    public static create(layer: MapBaseLayerType): OlBaseLayer {
        switch (layer) {
            case MapBaseLayerType.OSM:
                return Osmbaselayer.createBaseLayer();
            case MapBaseLayerType.MAPBOX:
                return Mapboxbaselayer.createBaseLayer();
            case MapBaseLayerType.MAPZEN:
                return Mapzenbaselayer.createBaseLayer();
            case MapBaseLayerType.SWISSTOPO_LIGHTBASE:
                return SwisstopoLightbaseBaselayer.createBaseLayer();
            case MapBaseLayerType.SWISSTOPO_PIXCOL:
                return SwisstopoPixcolBaselayer.createBaseLayer();
            case MapBaseLayerType.SWISSTOPO_IMAGE:
                return SwisstopoImageBaselayer.createBaseLayer();
            case MapBaseLayerType.SWISSTOPO_ICAO:
                return SwisstopoIcaoBaselayer.createBaseLayer();
            case MapBaseLayerType.SWISSTOPO_GLIDER:
                return SwisstopoGliderBaselayer.createBaseLayer();
            case MapBaseLayerType.OPENTOPOMAP:
            default:
                return Opentopobaselayer.createBaseLayer();
        }
    }
}
