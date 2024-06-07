import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LocationActions} from '../../../location-state/ngrx/location.actions';
import {getLocationIsWatching, getLocationStatus} from '../../../location-state/ngrx/location.selectors';
import {LocationServiceStatus} from '../../../location-domain/model/location-service-status';
import {MapButtonStatus} from '../../../../base-map/domain/model/map-button-status';


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.scss']
})
export class LocationButtonComponent implements OnInit {
    public locationStatus$ = this.appStore.pipe(select(getLocationStatus));
    public locationIsWatching$ = this.appStore.pipe(select(getLocationIsWatching));


    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
    }


    public onLocationClicked() {
        this.appStore.dispatch(LocationActions.toggleWatching());
    }


    public getButtonStatus(locationStatus: LocationServiceStatus): MapButtonStatus {
        switch (locationStatus) {
            case LocationServiceStatus.CURRENT:
                return MapButtonStatus.ON;
            case LocationServiceStatus.WAITING:
                return MapButtonStatus.WARNING;
            case LocationServiceStatus.ERROR:
                return MapButtonStatus.ERROR;
            case LocationServiceStatus.OFF:
            default:
                return MapButtonStatus.OFF;
        }
    }
}
