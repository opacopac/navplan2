import VectorLayer from 'ol/layer/Vector';
import {Vector} from 'ol/source';
import {Geometry} from 'ol/geom';
import {OlFeature} from './ol-feature';
import VectorImageLayer from 'ol/layer/VectorImage';
import {OlLayer} from './ol-layer';
import BaseLayer from 'ol/layer/Base';
import VectorSource from 'ol/source/Vector';
import {Feature} from 'ol';


export class OlVectorLayer implements OlLayer {
    public readonly vectorLayer: VectorLayer<Feature<Geometry>> | VectorImageLayer<Feature<Geometry>>;


    public constructor(vectorImage: boolean = false) {
        if (vectorImage) {
            this.vectorLayer = new VectorImageLayer({
                source: new Vector({})
            });
        } else {
            this.vectorLayer = new VectorLayer({
                source: new Vector({}),
            });
        }
    }


    public getLayer(): BaseLayer {
        return this.vectorLayer;
    }


    public setVisible(value: boolean) {
        this.vectorLayer.setVisible(value);
    }


    public addFeature(olFeature: OlFeature): void {
        this.vectorLayer.getSource().addFeature(olFeature.feature);
    }


    public clear(): void {
        this.vectorLayer.getSource().clear(true);
    }
}
