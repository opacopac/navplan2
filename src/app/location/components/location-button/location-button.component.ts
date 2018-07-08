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


    /*private onLocationChanged(currentPosition: Position4d) {
        // draw own plane
        const trafficPos = new TrafficPosition(
            currentPosition,
            TrafficPositionMethod.OWN,
            '',
            Date.now());
        this.ownPlane.positions.push(trafficPos);
        this.mapService.drawLocation(this.ownPlane);

        // move map
        if (this.locationService.isActivated) {
            const lastPositions = this.locationService.lastPositions;
            const lastIdx = lastPositions.length - 1;

            if (lastIdx > 0) {
                const latDiff = lastPositions[lastIdx].latitude - lastPositions[lastIdx - 1].latitude;
                const lonDiff = lastPositions[lastIdx].longitude - lastPositions[lastIdx - 1].longitude;
                const newPos = this.mapService.getMapPosition();
                newPos.latitude += latDiff;
                newPos.longitude += lonDiff;

                this.mapService.setMapPosition(newPos);
            } else {
                this.mapService.setMapPosition(currentPosition);
            }
        }
    }*/


    public getButtonStatus(status: LocationServiceStatus): ButtonStatus {
        switch (status) {
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
