import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';
import {Observable, Subscription} from 'rxjs';
import {OlOwnPlane} from './ol-own-plane';
import {Position4d} from '../../geo-math/domain-model/geometry/position4d';
import {LocationState} from '../location-state';
import VectorLayer from 'ol/layer/Vector';


export class OlOwnPlaneContainer extends OlComponentBase {
    private readonly ownPlaneSubscription: Subscription;
    private olOwnPlane: OlOwnPlane;


    constructor(
        private readonly ownPlaneLayer: VectorLayer,
        locationState$: Observable<LocationState>
    ) {
        super();

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
        this.olOwnPlane = new OlOwnPlane(lastPositions, this.ownPlaneLayer);
    }


    private destroyFeatures() {
        this.olOwnPlane = undefined;
        this.ownPlaneLayer.getSource().clear(true);
    }
}
