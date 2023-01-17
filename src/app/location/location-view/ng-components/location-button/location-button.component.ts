import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LocationActions} from '../../../location-state/ngrx/location.actions';
import {getLocationIsWatching, getLocationStatus} from '../../../location-state/ngrx/location.selectors';
import {LocationServiceStatus} from '../../../location-domain/model/location-service-status';


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.css']
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


    public getStatusCLass(locationStatus: LocationServiceStatus): string {
        switch (locationStatus) {
            case LocationServiceStatus.CURRENT:
                return 'mapbutton-status-ok';
            case LocationServiceStatus.WAITING:
                return 'mapbutton-status-warn';
            case LocationServiceStatus.ERROR:
                return 'mapbutton-status-error';
            case LocationServiceStatus.OFF:
            default:
                return 'mapbutton-primary';
        }
    }
}
