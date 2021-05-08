import {OlComponentBase} from '../../base-map/ol-model/ol-component-base';


export class OlChartContainer extends OlComponentBase {
    /*private readonly ownPlaneSubscription: Subscription;
    private olOwnPlane: OlOwnPlane;


    constructor(
        private readonly chartLayer: ImageLayer,
        locationState$: Observable<LocationState>
    ) {
        super();

        this.ownPlaneSubscription = locationState$.subscribe((locationState) => {
            this.destroyFeatures();
            if (locationState.isWatching) {
                this.addFeatures(locationState.lastPositions);
            }
        });
    }*/


    public get isSelectable(): boolean {
        return false;
    }


    /*public destroy() {
        this.ownPlaneSubscription.unsubscribe();
        this.destroyFeatures();
    }



    private addFeatures(lastPositions: Position4d[]) {
        this.olOwnPlane = new OlOwnPlane(lastPositions, this.ownPlaneLayer);
    }


    private destroyFeatures() {
        this.olOwnPlane = undefined;
        this.ownPlaneLayer.getSource().clear(true);
    }*/
}
