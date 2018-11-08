import * as ol from 'openlayers';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {BaseMapContext} from '../../base-map/model/base-map-context';
import {Subscription} from 'rxjs';
import {OlTrackLine} from './ol-track-line';
import {getShowTrack} from '../track.selectors';
import {Track} from '../model/track';
import {select} from '@ngrx/store';


export class OlTrackContainer extends OlComponentBase {
    private readonly trackSubscription: Subscription;
    private readonly trackLayer: ol.layer.Vector;
    private olTrackLine: OlTrackLine;


    constructor(mapContext: BaseMapContext) {
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
