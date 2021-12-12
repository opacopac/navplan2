import {Observable, Subscription} from 'rxjs';
import {OlOwnPlane} from './ol-own-plane';
import {Position4d} from '../../geo-physics/domain-model/geometry/position4d';
import {LocationState} from '../../location-state/state-model/location-state';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';


export class OlOwnPlaneContainer {
    private readonly ownPlaneSubscription: Subscription;


    constructor(
        private readonly ownPlaneLayer: OlVectorLayer,
        locationState$: Observable<LocationState>
    ) {
        this.ownPlaneSubscription = locationState$.subscribe((locationState) => {
            this.clearFeatures();
            if (locationState.isWatching) {
                this.drawFeatures(locationState.lastPositions);
            }
        });
    }


    public destroy() {
        this.ownPlaneSubscription.unsubscribe();
        this.clearFeatures();
    }



    private drawFeatures(lastPositions: Position4d[]) {
        if (lastPositions) {
            OlOwnPlane.draw(lastPositions, this.ownPlaneLayer);
        }
    }


    private clearFeatures() {
        this.ownPlaneLayer.clear();
    }
}
