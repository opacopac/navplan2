import TileLayer from 'ol/layer/Tile';
import {XYZ} from 'ol/source';
import VectorTileLayer from 'ol/layer/VectorTile';


export class OlBaseLayer {
    public constructor(public layer: TileLayer<XYZ> | VectorTileLayer) {
    }
}
