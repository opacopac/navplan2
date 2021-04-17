import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ToggleWatchTrafficAction} from '../../ngrx/traffic.actions';
import {getTrafficStatus} from '../../ngrx/traffic.selectors';
import {TrafficServiceStatus} from '../../domain-model/traffic-service-status';


@Component({
    selector: 'app-traffic-button',
    templateUrl: './traffic-button.component.html',
    styleUrls: ['./traffic-button.component.css']
})
export class TrafficButtonComponent implements OnInit {
    public trafficStatus$ = this.appStore.pipe(select(getTrafficStatus));


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
                return 'mapoverlay-status-ok';
            case TrafficServiceStatus.WAITING:
                return 'mapoverlay-status-warn';
            case TrafficServiceStatus.ERROR:
                return 'mapoverlay-status-error';
            case TrafficServiceStatus.OFF:
            default:
                return 'mapoverlay-primary';
        }
    }
}
