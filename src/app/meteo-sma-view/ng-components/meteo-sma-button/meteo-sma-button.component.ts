import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {getMeteoSmaState} from '../../../meteo-sma-state/ngrx/meteo-sma.selectors';
import {MeteoSmaButtonStatus} from '../../../meteo-sma/domain-model/meteo-sma-button-status';
import {MeteoSmaActions} from '../../../meteo-sma-state/ngrx/meteo-sma.actions';
import {MeteoSmaState} from '../../../meteo-sma/domain-model/meteo-sma-state';


@Component({
    selector: 'app-meteo-sma-button',
    templateUrl: './meteo-sma-button.component.html',
    styleUrls: ['./meteo-sma-button.component.css']
})
export class MeteoSmaButtonComponent implements OnInit {
    public meteoSmaState$ = this.appStore.pipe(select(getMeteoSmaState));
    public readonly iconUrl = environment.iconBaseUrl + 'windsock.svg';


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onSmaMeteoButtonClicked() {
        this.appStore.dispatch(MeteoSmaActions.toggle());
    }


    public getStatusCLass(state: MeteoSmaState): string {
        switch (state.buttonStatus) {
            case MeteoSmaButtonStatus.CURRENT:
                return 'mapoverlay-status-ok';
            case MeteoSmaButtonStatus.WAITING:
                return 'mapoverlay-status-warn';
            case MeteoSmaButtonStatus.ERROR:
                return 'mapoverlay-status-readError';
            case MeteoSmaButtonStatus.OFF:
            default:
                return 'mapoverlay-primary';
        }
    }
}
