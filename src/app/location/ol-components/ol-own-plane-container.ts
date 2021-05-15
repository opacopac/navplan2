import {Observable, Subscription} from 'rxjs';
import {OlOwnPlane} from './ol-own-plane';
import {Position4d} from '../../common/geo-math/domain-model/geometry/position4d';
import {LocationState} from '../ngrx/location-state';
import VectorLayer from 'ol/layer/Vector';


export class OlOwnPlaneContainer {
    private readonly ownPlaneSubscription: Subscription;
    private olOwnPlane: OlOwnPlane;


    constructor(
        private readonly ownPlaneLayer: VectorLayer,
        locationState$: Observable<LocationState>
    ) {
        this.ownPlaneSubscription = locationState$.subscribe((locationState) => {
            this.destroyFeatures();
            if (locationState.isWatching) {
                this.addFeatures(locationState.lastPositions);
            }
        });
    }


    public destroy() {
        this.ownPlaneSubscription.unsubscribe();
        this.destroyFeatures();
    }



    private addFeatures(lastPositions: Position4d[]) {
        this.olOwnPlane = new OlOwnPlane(lastPositions, this.ownPlaneLayer);
    }


    private destroyFeatures() {
        this.olOwnPlane = undefined;
        this.ownPlaneLayer.getSource().clear(true);
    }
}
