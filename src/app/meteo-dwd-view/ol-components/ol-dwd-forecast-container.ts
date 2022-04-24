import {Observable, Subscription} from 'rxjs';
import {MeteoDwdState} from '../../meteo-dwd/domain-model/meteo-dwd-state';
import {MeteoDwdButtonStatus} from '../../meteo-dwd/domain-model/meteo-dwd-button-status';
import {OlTileLayer} from '../../base-map-view/ol-model/ol-tile-layer';


export class OlDwdForecastContainer {
    private readonly meteoDwdStateSubscription: Subscription;


    constructor(
        private readonly dwdForecastLayer: OlTileLayer,
        private readonly meteoDwdState$: Observable<MeteoDwdState>,
    ) {
        this.meteoDwdStateSubscription = this.meteoDwdState$.subscribe(state => {
            if (state.buttonStatus === MeteoDwdButtonStatus.CURRENT) {
                this.showLayer();
            } else {
                this.hideLayer();
            }
        });
    }


    public destroy() {
        this.meteoDwdStateSubscription.unsubscribe();
    }


    private showLayer() {
        this.dwdForecastLayer.setVisible(true);
    }


    private hideLayer() {
        this.dwdForecastLayer.setVisible(false);
    }
}
