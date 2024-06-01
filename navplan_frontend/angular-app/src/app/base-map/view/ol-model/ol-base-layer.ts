import TileLayer from 'ol/layer/Tile';
import {XYZ} from 'ol/source';
import VectorTileLayer from 'ol/layer/VectorTile';
import {IBaseLayer} from '../../domain/model/i-base-layer';
import {MapBaseLayerType} from '../../domain/model/map-base-layer-type';
import { FeatureLike } from 'ol/Feature';


export class OlBaseLayer implements IBaseLayer {
    public constructor(
        public readonly type: MapBaseLayerType,
        public readonly layer: TileLayer<XYZ> | VectorTileLayer<FeatureLike>
    ) {
    }


    public getType(): MapBaseLayerType {
        return this.type;
    }
}
