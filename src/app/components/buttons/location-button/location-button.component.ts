import {Component, OnInit} from '@angular/core';
import {MapService} from '../../../services/map/map.service';
import {TimerService} from '../../../services/utils/timer.service';
import {MessageService} from '../../../services/utils/message.service';
import {LocationService, LocationServiceStatus} from '../../../services/location/location.service';
import {Traffic} from '../../../model/traffic';
import {ButtonSize} from '../button-base.directive';
import {ButtonStatus} from '../status-button.directive';


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent implements OnInit {
    public ButtonSize = ButtonSize;
    private ownPlane: Traffic;


    constructor(
        private messageService: MessageService,
        private mapService: MapService,
        public locationService: LocationService,
        public timerService: TimerService) {
    }


    ngOnInit() {
    }


    public onLocationClicked() {
        this.locationService.toggleWatching();
        // $scope.stopFollowTraffic(); TODO

        /*if (!this.locationService.isActivated) {
            this.ownPlane = this.getOwnAirplane();
            this.locationService.startWatching();
            this.timerService.startClockTimer();
        } else {
            this.locationService.stopWatching();
            this.timerService.stopClockTimer();
            this.mapService.drawLocation(undefined);
            // $scope.storeTrackLocal(); TODO
        }*/
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
