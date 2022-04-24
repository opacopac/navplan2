import {OlLayer} from './ol-layer';
import BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';


export class OlTileLayer implements OlLayer {
    public constructor(private readonly tileLayer: TileLayer<XYZ>) {
    }


    public getLayer(): BaseLayer {
        return this.tileLayer;
    }


    public setVisible(value: boolean) {
        this.tileLayer.setVisible(value);
    }
}
