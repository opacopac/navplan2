import {Vector} from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {OlMapContext} from '../../ol-map/domain/ol-map-context';
import {Subscription} from 'rxjs';
import {OlTrackLine} from './ol-track-line';
import {getShowTrack} from '../track.selectors';
import {Track} from '../domain/track';
import {select} from '@ngrx/store';


export class OlTrackContainer extends OlComponentBase {
    private readonly trackSubscription: Subscription;
    private readonly trackLayer: VectorLayer;
    private olTrackLine: OlTrackLine;


    constructor(mapContext: OlMapContext) {
        super();

        this.trackLayer = mapContext.mapService.addVectorLayer(false);
        const showTrack$ = mapContext.appStore.pipe(select(getShowTrack));
        this.trackSubscription = showTrack$.subscribe((track) => {
            this.destroyFeatures();
            this.addFeatures(track, this.trackLayer.getSource());
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.trackSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(track: Track, source: Vector) {
        if (track) {
            this.olTrackLine = new OlTrackLine(track, source);
        }
    }


    private destroyFeatures() {
        this.olTrackLine = undefined;
        this.trackLayer.getSource().clear(true);
    }
}
