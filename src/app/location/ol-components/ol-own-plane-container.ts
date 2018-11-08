import * as ol from 'openlayers';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {BaseMapContext} from '../../base-map/model/base-map-context';
import {Subscription} from 'rxjs';
import {OlOwnPlane} from './ol-own-plane';
import {getLocationState} from '../location.selectors';
import {Position4d} from '../../shared/model/geometry/position4d';
import {select} from '@ngrx/store';


export class OlOwnPlaneContainer extends OlComponentBase {
    private readonly ownPlaneSubscription: Subscription;
    private readonly ownPlaneLayer: ol.layer.Vector;
    private olOwnPlane: OlOwnPlane;


    constructor(mapContext: BaseMapContext) {
        super();

        this.ownPlaneLayer = mapContext.mapService.addVectorLayer(false);
        const locationState$ = mapContext.appStore.pipe(select(getLocationState));
        this.ownPlaneSubscription = locationState$.subscribe((locationState) => {
            this.destroyFeatures();
            if (locationState.isWatching) {
                this.addFeatures(locationState.lastPositions);
            }
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.ownPlaneSubscription.unsubscribe();
        this.destroyFeatures();
    }



    private addFeatures(lastPositions: Position4d[]) {
        this.olOwnPlane = new OlOwnPlane(lastPositions, this.ownPlaneLayer.getSource());
    }


    private destroyFeatures() {
        this.olOwnPlane = undefined;
        this.ownPlaneLayer.getSource().clear(true);
    }
}
