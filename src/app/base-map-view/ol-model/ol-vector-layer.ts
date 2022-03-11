import VectorLayer from 'ol/layer/Vector';
import {Vector} from 'ol/source';
import {Geometry} from 'ol/geom';
import {OlFeature} from './ol-feature';
import VectorImageLayer from 'ol/layer/VectorImage';


export class OlVectorLayer {
    public readonly vectorLayer: VectorLayer<Vector<Geometry>> | VectorImageLayer<Vector<Geometry>>;


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


    public addFeature(olFeature: OlFeature): void {
        this.vectorLayer.getSource().addFeature(olFeature.feature);
    }


    public clear(): void {
        this.vectorLayer.getSource().clear(true);
    }
}
