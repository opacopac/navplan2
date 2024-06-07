import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TrafficActions} from '../../../state/ngrx/traffic.actions';
import {getTrafficStatus} from '../../../state/ngrx/traffic.selectors';
import {TrafficServiceStatus} from '../../../domain/model/traffic-service-status';
import {MapButtonStatus} from '../../../../base-map/domain/model/map-button-status';


@Component({
    selector: 'app-traffic-button',
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


    public getButtonStatus(trafficStatus: TrafficServiceStatus): MapButtonStatus {
        switch (trafficStatus) {
            case TrafficServiceStatus.CURRENT:
                return MapButtonStatus.ON;
            case TrafficServiceStatus.WAITING:
                return MapButtonStatus.WARNING;
            case TrafficServiceStatus.ERROR:
                return MapButtonStatus.ERROR;
            case TrafficServiceStatus.OFF:
            default:
                return MapButtonStatus.OFF;
        }
    }
}
