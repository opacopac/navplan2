import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import {OlTrackLine} from './ol-track-line';
import {Track} from '../domain-model/track';
import VectorLayer from 'ol/layer/Vector';


export class OlTrackContainer extends OlComponentBase {
    private readonly trackSubscription: Subscription;


    public constructor(
        private readonly trackLayer: VectorLayer,
        showTrack$: Observable<Track>
    ) {
        super();

        this.trackSubscription = showTrack$.subscribe((track) => {
            this.clearFeatures();
            this.addFeatures(track);
        });
    }


    public get isSelectable(): boolean {
        return false;
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
