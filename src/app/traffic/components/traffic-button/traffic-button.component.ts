import {Component, OnInit} from '@angular/core';
import {TrafficServiceStatus} from '../../services/traffic.service';
import {ButtonStatus} from '../../../shared/directives/status-button/status-button.directive';
import {ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {Store} from '@ngrx/store';
import {ToggleWatchTrafficAction} from '../../traffic.actions';
import {getTrafficIsWatching, getTrafficStatus} from '../../traffic.selectors';


@Component({
    selector: 'app-traffic-button',
    templateUrl: './traffic-button.component.html',
    styleUrls: ['./traffic-button.component.css']
})
export class TrafficButtonComponent implements OnInit {
    public ButtonSize = ButtonSize;
    public trafficStatus$ = this.appStore.select(getTrafficStatus);
    public trafficIsWatching$ = this.appStore.select(getTrafficIsWatching);


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public getButtonStatus(trafficStatus: TrafficServiceStatus): ButtonStatus {
        switch (trafficStatus) {
            case TrafficServiceStatus.CURRENT:
                return ButtonStatus.OK;
            case TrafficServiceStatus.WAITING:
                return ButtonStatus.WARNING;
            case TrafficServiceStatus.ERROR:
                return ButtonStatus.ERROR;
            case TrafficServiceStatus.OFF:
            default:
                return ButtonStatus.OFF;
        }
    }


    public onToggleTrafficClicked() {
        this.appStore.dispatch(
            new ToggleWatchTrafficAction()
        );
    }
}
