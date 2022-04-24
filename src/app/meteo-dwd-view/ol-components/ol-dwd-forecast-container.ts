import {Observable, Subscription} from 'rxjs';
import {MeteoDwdButtonStatus} from '../../meteo-dwd/domain-model/meteo-dwd-button-status';
import {OlDwdForecastTilelayer} from './ol-dwd-forecast-tilelayer';


export class OlDwdForecastContainer {
    private readonly meteoDwdButtonStatusSubscription: Subscription;
    private readonly meteoDwdSelectedIntervalSubscription: Subscription;


    constructor(
        private readonly dwdForecastLayer: OlDwdForecastTilelayer,
        private readonly meteoDwdButtonStatus$: Observable<MeteoDwdButtonStatus>,
        private readonly meteoDwdSelectedInterval$: Observable<number>,
    ) {
        this.meteoDwdButtonStatusSubscription = this.meteoDwdButtonStatus$.subscribe(buttonStatus => {
            if (buttonStatus === MeteoDwdButtonStatus.CURRENT) {
                this.showLayer();
            } else {
                this.hideLayer();
            }
        });

        this.meteoDwdSelectedIntervalSubscription = this.meteoDwdSelectedInterval$.subscribe(interval => {
            this.dwdForecastLayer.setInterval(interval);
        });
    }


    public destroy() {
        this.meteoDwdButtonStatusSubscription.unsubscribe();
        this.meteoDwdSelectedIntervalSubscription.unsubscribe();
    }


    private showLayer() {
        this.dwdForecastLayer.setVisible(true);
    }


    private hideLayer() {
        this.dwdForecastLayer.setVisible(false);
    }
}
