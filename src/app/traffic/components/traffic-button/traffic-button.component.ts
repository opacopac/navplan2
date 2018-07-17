import {Component, OnInit} from '@angular/core';
import {TrafficServiceStatus} from '../../services/traffic-reducer.service';
import {Store} from '@ngrx/store';
import {ToggleWatchTrafficAction} from '../../traffic.actions';
import {getTrafficIsWatching, getTrafficStatus} from '../../traffic.selectors';


@Component({
    selector: 'app-traffic-button',
    templateUrl: './traffic-button.component.html',
    styleUrls: ['./traffic-button.component.css']
})
export class TrafficButtonComponent implements OnInit {
    public trafficStatus$ = this.appStore.select(getTrafficStatus);
    public trafficIsWatching$ = this.appStore.select(getTrafficIsWatching);


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onToggleTrafficClicked() {
        this.appStore.dispatch(
            new ToggleWatchTrafficAction()
        );
    }


    public getStatusCLass(trafficStatus: TrafficServiceStatus): string {
        switch (trafficStatus) {
            case TrafficServiceStatus.CURRENT:
                return 'status-ok';
            case TrafficServiceStatus.WAITING:
                return 'status-warn';
            case TrafficServiceStatus.ERROR:
                return 'status-error';
            case TrafficServiceStatus.OFF:
            default:
                return 'accent';
        }
    }
}
