import {Observable, Subscription} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import {Webcam} from '../../../webcam/domain-model/webcam';
import {OlWebcam} from './ol-webcam';


export class OlWebcamContainer {
    private readonly webcamSubscription: Subscription;


    constructor(
        private readonly webcamLayer: VectorLayer,
        webcams$: Observable<Webcam[]>
    ) {
        this.webcamSubscription = webcams$.subscribe((webcams) => {
            this.clearFeatures();
            this.addFeatures(webcams);
        });
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
