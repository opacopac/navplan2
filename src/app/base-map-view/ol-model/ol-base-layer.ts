import TileLayer from 'ol/layer/Tile';
import {XYZ} from 'ol/source';


export class OlBaseLayer {
    public constructor(public layer: TileLayer<XYZ>) {
    }
}
