import {Observable, Subscription} from 'rxjs';
import {MeteoDwdButtonStatus} from '../../domain/model/meteo-dwd-button-status';
import {OlDwdForecastTilelayer} from './ol-dwd-forecast-tilelayer';
import {ValueGrid} from '../../domain/model/value-grid';
import {WindSpeedDir} from '../../domain/model/wind-speed-dir';
import {OlVectorLayer} from '../../../base-map/view/ol-model/ol-vector-layer';
import {OlDwdForecastWindgrid} from './ol-dwd-forecast-windgrid';


export class OlDwdForecastContainer {
    private readonly meteoDwdButtonStatusSubscription: Subscription;
    private readonly meteoDwdSelectedIntervalSubscription: Subscription;
    private readonly windGrid: OlDwdForecastWindgrid;


    constructor(
        private readonly dwdForecastLayer: OlDwdForecastTilelayer,
        private readonly dwdForecastWindLayer: OlVectorLayer,
        private readonly meteoDwdButtonStatus$: Observable<MeteoDwdButtonStatus>,
        private readonly meteoDwdSelectedInterval$: Observable<number>,
        private readonly meteoDwdWindGrid$: Observable<ValueGrid<WindSpeedDir>>
    ) {
        this.meteoDwdButtonStatusSubscription = this.meteoDwdButtonStatus$.subscribe(buttonStatus => {
            this.showLayers(buttonStatus === MeteoDwdButtonStatus.CURRENT);
        });

        this.meteoDwdSelectedIntervalSubscription = this.meteoDwdSelectedInterval$.subscribe(interval => {
            this.dwdForecastLayer.setInterval(interval);
        });

        this.windGrid = new OlDwdForecastWindgrid(
            this.dwdForecastWindLayer,
            this.meteoDwdWindGrid$
        );
    }


    public destroy() {
        this.meteoDwdButtonStatusSubscription.unsubscribe();
        this.meteoDwdSelectedIntervalSubscription.unsubscribe();
        this.windGrid.destroy();
    }


    private showLayers(isVisible: boolean) {
        this.dwdForecastLayer.setVisible(isVisible);
        this.dwdForecastWindLayer.setVisible(isVisible);
    }
}
