import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import BaseLayer from 'ol/layer/Base';
import {OlLayer} from '../../../base-map/view/ol-model/ol-layer';


export class OlMeteoForecastMapTileLayer implements OlLayer {
    private readonly layer: TileLayer<XYZ>;
    private currentUrl: string | undefined;
    private currentMaxZoom: number | undefined;


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
        this.currentUrl = url;
        this.updateSource();
    }


    public setMaxZoom(maxZoom: number) {
        this.currentMaxZoom = maxZoom;
        this.updateSource();
    }


    private createLayer() {
        return new TileLayer<XYZ>({
            opacity: 0.75,
            visible: false
        });
    }


    private updateSource() {
        if (this.currentUrl !== undefined && this.currentMaxZoom !== undefined) {
            const newSource = new XYZ({
                url: this.currentUrl,
                maxZoom: this.currentMaxZoom,
                // imageSmoothing: false
                // attributions: attributions
            });
            this.layer.setSource(newSource);
        }
    }
}
