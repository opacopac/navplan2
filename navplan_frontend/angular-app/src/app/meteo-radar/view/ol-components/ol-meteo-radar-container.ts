import {Observable, Subscription} from 'rxjs';
import {OlMeteoRadarMapTileLayer} from './ol-meteo-radar-map-tile-layer';


export class OlMeteoRadarContainer {
    private readonly showLayerSubscription: Subscription;
    private readonly mapTilesUrlSubscription: Subscription;
    private readonly maxZoomLevelSubscription: Subscription;


    constructor(
        private readonly meteoRadarBgLayer: OlMeteoRadarMapTileLayer,
        private readonly showLayer$: Observable<boolean>,
        private readonly meteoRadarMapTilesUrl$: Observable<string>,
        private readonly meteoRadarMaxZoomLevel$: Observable<number>
    ) {
        this.showLayerSubscription = this.showLayer$.subscribe(showLayer => {
            this.showLayers(showLayer);
        });

        this.mapTilesUrlSubscription = this.meteoRadarMapTilesUrl$.subscribe(url => {
            this.meteoRadarBgLayer.setUrl(url);
        });

        this.maxZoomLevelSubscription = this.meteoRadarMaxZoomLevel$.subscribe(maxZoom => {
            this.meteoRadarBgLayer.setMaxZoom(maxZoom);
        });
    }


    public destroy() {
        this.showLayerSubscription.unsubscribe();
        this.mapTilesUrlSubscription.unsubscribe();
        this.maxZoomLevelSubscription.unsubscribe();

        this.showLayers(undefined);
    }


    private showLayers(showLayer: boolean) {
        this.meteoRadarBgLayer.setVisible(showLayer);
    }
}
