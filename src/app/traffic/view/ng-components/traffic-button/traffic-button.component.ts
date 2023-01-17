import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TrafficActions} from '../../../state/ngrx/traffic.actions';
import {getTrafficStatus} from '../../../state/ngrx/traffic.selectors';
import {TrafficServiceStatus} from '../../../domain/model/traffic-service-status';


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
        this.appStore.dispatch(TrafficActions.toggleWatch());
    }


    public getStatusCLass(trafficStatus: TrafficServiceStatus): string {
        switch (trafficStatus) {
            case TrafficServiceStatus.CURRENT:
                return 'mapbutton-status-ok';
            case TrafficServiceStatus.WAITING:
                return 'mapbutton-status-warn';
            case TrafficServiceStatus.ERROR:
                return 'mapbutton-status-error';
            case TrafficServiceStatus.OFF:
            default:
                return 'mapbutton-primary';
        }
    }
}
