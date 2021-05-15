import {Observable, Subscription} from 'rxjs';
import {OlTrackLine} from './ol-track-line';
import {Track} from '../domain-model/track';
import VectorLayer from 'ol/layer/Vector';


export class OlTrackContainer {
    private readonly trackSubscription: Subscription;


    public constructor(
        private readonly trackLayer: VectorLayer,
        showTrack$: Observable<Track>
    ) {
        this.trackSubscription = showTrack$.subscribe((track) => {
            this.clearFeatures();
            this.addFeatures(track);
        });
    }


    public destroy() {
        this.trackSubscription.unsubscribe();
        this.clearFeatures();
    }


    private addFeatures(track: Track) {
        if (track) {
            const olTrackLine = new OlTrackLine(track, this.trackLayer);
        }
    }


    private clearFeatures() {
        this.trackLayer.getSource().clear(true);
    }
}
