import {Observable, Subscription} from 'rxjs';
import {Webcam} from '../domain-model/webcam';
import {OlWebcam} from './ol-webcam';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';


export class OlWebcamContainer {
    private readonly webcamSubscription: Subscription;


    constructor(
        private readonly webcamLayer: OlVectorLayer,
        webcams$: Observable<Webcam[]>
    ) {
        this.webcamSubscription = webcams$.subscribe((webcams) => {
            this.clearFeatures();
            this.drawFeatures(webcams);
        });
    }


    public destroy() {
        this.webcamSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(webcams: Webcam[]) {
        if (webcams) {
            webcams.forEach(webcam => OlWebcam.draw(webcam, this.webcamLayer));
        }
    }


    private clearFeatures() {
        this.webcamLayer.clear();
    }
}
