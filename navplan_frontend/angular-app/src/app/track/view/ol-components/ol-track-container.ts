import {Observable, Subscription} from 'rxjs';
import {OlTrackLine} from './ol-track-line';
import {Track} from '../../domain/model/track';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';


export class OlTrackContainer {
    private readonly trackSubscription: Subscription;


    public constructor(
        private readonly trackLayer: OlVectorLayer,
        selectedTrack$: Observable<Track>
    ) {
        this.trackSubscription = selectedTrack$.subscribe((track) => {
            this.clearFeatures();
            this.drawFeatures(track);
        });
    }


    public destroy() {
        this.trackSubscription.unsubscribe();
        this.clearFeatures();
    }


    private drawFeatures(track: Track) {
        if (track) {
            OlTrackLine.draw(track, this.trackLayer);
        }
    }


    private clearFeatures() {
        this.trackLayer.clear();
    }
}
