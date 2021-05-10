import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LocationServiceStatus} from '../../domain-service/location.service';
import {ToggleWatchLocationAction} from '../../ngrx/location.actions';
import {getLocationIsWatching, getLocationStatus} from '../../ngrx/location.selectors';


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
        this.appStore.dispatch(
            new ToggleWatchLocationAction()
        );
    }


    public getStatusCLass(locationStatus: LocationServiceStatus): string {
        switch (locationStatus) {
            case LocationServiceStatus.CURRENT:
                return 'mapoverlay-status-ok';
            case LocationServiceStatus.WAITING:
                return 'mapoverlay-status-warn';
            case LocationServiceStatus.ERROR:
                return 'mapoverlay-status-error';
            case LocationServiceStatus.OFF:
            default:
                return 'mapoverlay-primary';
        }
    }
}
