import {Component, OnInit} from '@angular/core';
import {VerticalMapActions} from '../../../state/ngrx/vertical-map.actions';
import {VerticalMapButtonStatus} from '../../../domain/model/vertical-map-button-status';
import {select, Store} from '@ngrx/store';
import {getVerticalMapState} from '../../../state/ngrx/vertical-map.selectors';
import {VerticalMapState} from '../../../state/state-model/vertical-map-state';
import {ButtonStatus} from '../../../../common/model/button-status';


@Component({
    selector: 'app-vertical-map-button',
    templateUrl: './vertical-map-button.component.html',
    styleUrls: ['./vertical-map-button.component.scss']
})
export class VerticalMapButtonComponent implements OnInit {
    public vmState$ = this.appStore.pipe(select(getVerticalMapState));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onVerticalMapClicked() {
        this.appStore.dispatch(VerticalMapActions.toggle());
    }


    public getButtonStatus(vmState: VerticalMapState): ButtonStatus {
        switch (vmState.buttonStatus) {
            case VerticalMapButtonStatus.CURRENT:
                return ButtonStatus.ON;
            case VerticalMapButtonStatus.WAITING:
                return ButtonStatus.WARNING;
            case VerticalMapButtonStatus.ERROR:
                return ButtonStatus.ERROR;
            case VerticalMapButtonStatus.OFF:
            default:
                return ButtonStatus.OFF;
        }
    }
}
