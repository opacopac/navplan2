import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TrafficActions} from '../../../state/ngrx/traffic.actions';
import {getTrafficStatus} from '../../../state/ngrx/traffic.selectors';
import {TrafficServiceStatus} from '../../../domain/model/traffic-service-status';
import {ButtonStatus} from '../../../../common/view/model/button-status';
import {StatusButtonComponent} from '../../../../common/view/ng-components/status-button/status-button.component';
import {CommonModule} from '@angular/common';


@Component({
    selector: 'app-traffic-button',
    imports: [
        CommonModule,
        StatusButtonComponent
    ],
    templateUrl: './traffic-button.component.html',
    styleUrls: ['./traffic-button.component.scss']
})
export class TrafficButtonComponent implements OnInit {
    public trafficStatus$ = this.appStore.pipe(select(getTrafficStatus));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onToggleTrafficClicked() {
        this.appStore.dispatch(TrafficActions.toggleWatch());
    }


    public getButtonStatus(trafficStatus: TrafficServiceStatus): ButtonStatus {
        switch (trafficStatus) {
            case TrafficServiceStatus.CURRENT:
                return ButtonStatus.ON;
            case TrafficServiceStatus.WAITING:
                return ButtonStatus.WARNING;
            case TrafficServiceStatus.ERROR:
                return ButtonStatus.ERROR;
            case TrafficServiceStatus.OFF:
            default:
                return ButtonStatus.OFF;
        }
    }
}
