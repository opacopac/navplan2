import {Component, OnInit} from '@angular/core';
import {LocationServiceStatus} from '../../services/location/location.service';
import {ButtonSize} from '../../../shared/directives/button-base/button-base.directive';
import {ButtonStatus} from '../../../shared/directives/status-button/status-button.directive';
import {Store} from '@ngrx/store';
import {ToggleWatchLocationAction} from '../../location.actions';
import {getLocationIsWatching, getLocationStatus} from '../../location.selectors';


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent implements OnInit {
    public ButtonSize = ButtonSize;
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


    public getButtonStatus(locationStatus: LocationServiceStatus): ButtonStatus {
        switch (locationStatus) {
            case LocationServiceStatus.CURRENT:
                return ButtonStatus.OK;
            case LocationServiceStatus.WAITING:
                return ButtonStatus.WARNING;
            case LocationServiceStatus.ERROR:
                return ButtonStatus.ERROR;
            case LocationServiceStatus.OFF:
            default:
                return ButtonStatus.OFF;
        }
    }
}
