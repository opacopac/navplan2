import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import BaseLayer from 'ol/layer/Base';
import {OlLayer} from '../../../base-map-view/ol-model/ol-layer';
import {StringnumberHelper} from '../../../system/domain-service/stringnumber/stringnumber-helper';


export class OlDwdForecastTilelayer implements OlLayer {
    private readonly layer: TileLayer<XYZ>;
    private interval = 0;


    public constructor() {
        this.layer = this.createLayer();
    }


    public getLayer(): BaseLayer {
        return this.layer;
    }


    public setVisible(value: boolean) {
        this.layer.setVisible(value);
    }


    public setInterval(value: number) {
        this.interval = value;
        const newUrl = this.getUrl();
        this.layer.getSource().setUrl(newUrl);
    }


    private createLayer(): TileLayer<XYZ> {
        return new TileLayer({
            opacity: 0.75,
            source: new XYZ({
                url: this.getUrl(),
                maxZoom: 7,
                // imageSmoothing: false
                // attributions: attributions
            })
        });
    }


    private getUrl(): string {
        const intervalStr = StringnumberHelper.zeroPad(this.interval + 20 - 20, 3);

        return 'http://localhost/navplan2/maptiles/meteo_test/wind_d2/' + intervalStr + '/{z}/{x}/{y}.png';
    }
}
