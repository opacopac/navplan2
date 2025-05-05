import {OlLayer} from './ol-layer';
import BaseLayer from 'ol/layer/Base';
import ImageLayer from 'ol/layer/Image';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {OlGeometry} from './ol-geometry';
import {ImageStatic} from 'ol/source';


export class OlImageLayer implements OlLayer {
    public readonly imageLayer: ImageLayer<ImageStatic>;


    public constructor() {
        this.imageLayer = new ImageLayer();
    }


    public getLayer(): BaseLayer {
        return this.imageLayer;
    }


    public setVisible(value: boolean) {
        this.imageLayer.setVisible(value);
    }


    public setImageSource(extent: Extent2d, url: string): void {
        debugger;
        const mercatorExtent = OlGeometry.getExtentAsMercator(extent);
        const source = new ImageStatic({
            url: url,
            imageExtent: mercatorExtent,
        });
        this.imageLayer.setSource(source);
    }
}
