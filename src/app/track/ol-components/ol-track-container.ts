import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {OlTrackLine} from './ol-track-line';
import {getShowTrack} from '../track.selectors';
import {Track} from '../model/track';


export class OlTrackContainer extends OlComponent {
    private readonly trackSubscription: Subscription;
    private readonly trackLayer: ol.layer.Vector;
    private olTrackLine: OlTrackLine;


    constructor(mapContext: MapContext) {
        super();

        this.trackLayer = mapContext.mapService.addVectorLayer(false, false);
        const showTrack$ = mapContext.appStore.select(getShowTrack);
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


    private addFeatures(track: Track, source: ol.source.Vector) {
        if (track) {
            this.olTrackLine = new OlTrackLine(track, source);
        }
    }


    private destroyFeatures() {
        this.olTrackLine = undefined;
        this.trackLayer.getSource().clear(true);
    }
}
