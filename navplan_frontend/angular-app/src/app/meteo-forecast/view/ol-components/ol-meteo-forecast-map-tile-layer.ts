import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import BaseLayer from 'ol/layer/Base';
import {OlLayer} from '../../../base-map/view/ol-model/ol-layer';


export class OlMeteoForecastMapTileLayer implements OlLayer {
    private readonly layer: TileLayer<XYZ>;


    public constructor() {
        this.layer = this.createLayer();
    }


    public getLayer(): BaseLayer {
        return this.layer;
    }


    public setVisible(value: boolean) {
        this.layer.setVisible(value);
    }


    public setUrl(url: string) {
        this.layer.getSource().setUrl(url);
    }


    public setMaxZoom(maxZoom: number) {
        this.layer.getSource().setProperties({maxZoom: maxZoom});
    }


    private createLayer(): TileLayer<XYZ> {
        return new TileLayer({
            opacity: 0.75,
            source: new XYZ({
                url: undefined,
                maxZoom: 8,
                // imageSmoothing: false
                // attributions: attributions
            })
        });
    }
}
