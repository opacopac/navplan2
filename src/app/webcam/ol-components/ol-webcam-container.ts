import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {Webcam} from '../domain-model/webcam';
import {OlWebcam} from './ol-webcam';


export class OlWebcamContainer extends OlComponentBase {
    private readonly webcamSubscription: Subscription;


    constructor(
        private readonly webcamLayer: VectorLayer,
        webcams$: Observable<Webcam[]>
    ) {
        super();

        this.webcamSubscription = webcams$.subscribe((webcams) => {
            this.clearFeatures();
            this.addFeatures(webcams);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.webcamSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(webcams: Webcam[]) {
        if (webcams) {
            webcams.forEach(webcam => new OlWebcam(webcam, this.webcamLayer));
        }
    }


    private clearFeatures() {
        this.webcamLayer.getSource().clear(true);
    }
}
