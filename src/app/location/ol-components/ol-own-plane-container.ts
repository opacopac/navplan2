import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {OlOwnPlane} from './ol-own-plane';
import {getLocationState} from '../location.selectors';


export class OlOwnPlaneContainer extends OlComponent {
    private readonly ownPlaneSubscription: Subscription;
    private olOwnPlane: OlOwnPlane;


    constructor(mapContext: MapContext) {
        super();

        const source = mapContext.mapService.trafficLayer.getSource();
        const locationState$ = mapContext.appStore.select(getLocationState);
        this.ownPlaneSubscription = locationState$.subscribe((locationState) => {
            this.destroyFeatures();
            if (locationState.isWatching) {
                this.olOwnPlane = new OlOwnPlane(locationState.lastPositions, source);
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


    private destroyFeatures() {
        if (this.olOwnPlane) {
            this.olOwnPlane.destroy();
        }
    }
}
