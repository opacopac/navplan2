import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Subscription} from 'rxjs';
import {OlOwnPlane} from './ol-own-plane';
import {getLocationState} from '../location.selectors';
import {Position4d} from '../../shared/model/geometry/position4d';


export class OlOwnPlaneContainer extends OlComponent {
    private readonly ownPlaneSubscription: Subscription;
    private readonly ownPlaneLayer: ol.layer.Vector;
    private olOwnPlane: OlOwnPlane;


    constructor(mapContext: MapContext) {
        super();

        this.ownPlaneLayer = mapContext.mapService.addVectorLayer(false, false);
        const locationState$ = mapContext.appStore.select(getLocationState);
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
