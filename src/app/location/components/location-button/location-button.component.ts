import {Component, OnInit} from '@angular/core';
import {LocationServiceStatus} from '../../services/location.service';
import {Store} from '@ngrx/store';
import {ToggleWatchLocationAction} from '../../location.actions';
import {getLocationIsWatching, getLocationStatus} from '../../location.selectors';


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent implements OnInit {
    public locationStatus$ = this.appStore.select(getLocationStatus);
    public locationIsWatching$ = this.appStore.select(getLocationIsWatching);


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
                return 'status-ok';
            case LocationServiceStatus.WAITING:
                return 'status-warn';
            case LocationServiceStatus.ERROR:
                return 'status-error';
            case LocationServiceStatus.OFF:
            default:
                return 'accent';
        }
    }
}
