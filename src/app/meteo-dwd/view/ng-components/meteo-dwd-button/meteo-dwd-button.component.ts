import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {environment} from '../../../../../environments/environment';
import {MeteoDwdState} from '../../../domain/model/meteo-dwd-state';
import {MeteoDwdButtonStatus} from '../../../domain/model/meteo-dwd-button-status';
import {getMeteoDwdState} from '../../../state/ngrx/meteo-dwd.selectors';
import {MeteoDwdActions} from '../../../state/ngrx/meteo-dwd.actions';


@Component({
    selector: 'app-meteo-dwd-button',
    templateUrl: './meteo-dwd-button.component.html',
    styleUrls: ['./meteo-dwd-button.component.css']
})
export class MeteoDwdButtonComponent implements OnInit {
    public meteoDwdState$ = this.appStore.pipe(select(getMeteoDwdState));
    public readonly iconUrl = environment.iconBaseUrl + 'windsock.svg';


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onDwdMeteoButtonClicked() {
        this.appStore.dispatch(MeteoDwdActions.toggle());
    }


    public getStatusCLass(state: MeteoDwdState): string {
        switch (state.buttonStatus) {
            case MeteoDwdButtonStatus.CURRENT:
                return 'mapoverlay-status-ok';
            case MeteoDwdButtonStatus.WAITING:
                return 'mapoverlay-status-warn';
            case MeteoDwdButtonStatus.ERROR:
                return 'mapoverlay-status-readError';
            case MeteoDwdButtonStatus.OFF:
            default:
                return 'mapoverlay-primary';
        }
    }
}
