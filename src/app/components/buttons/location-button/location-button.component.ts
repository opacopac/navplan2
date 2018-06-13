import {Component, Input, OnInit} from '@angular/core';
import { MapService } from '../../../services/map/map.service';
import { TimerService } from '../../../services/utils/timer.service';
import { MessageService } from '../../../services/utils/message.service';
import { LocationService, LocationServiceStatus } from '../../../services/location/location.service';
import { Traffic, TrafficAddressType, TrafficDataSource, TrafficPosition, TrafficPositionMethod, TrafficAircraftType } from '../../../model/traffic';
import { Position4d } from '../../../model/position';
import { ButtonSize } from '../button-base.directive';
import { ButtonStatus } from '../status-button.directive';


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
        // $scope.stopFollowTraffic(); TODO

        if (!this.locationService.isActivated) {
            this.ownPlane = this.getOwnAirplane();
            this.locationService.startWatching(this.onLocationChanged.bind(this), this.onLocationError.bind(this));
            this.timerService.startClockTimer();
        } else {
            this.locationService.stopWatching();
            this.timerService.stopClockTimer();
            this.mapService.drawLocation(undefined);
            // $scope.storeTrackLocal(); TODO
        }
    }


    private getOwnAirplane(): Traffic {
        return new Traffic(
            '',
            TrafficAddressType.RANDOM,
            TrafficDataSource.OWN,
            TrafficAircraftType.OWN,
            '',
            '',
            '',
            '',
            []
        );
    }


    private onLocationChanged(currentPosition: Position4d) {
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
    }


    private onLocationError(message: string) {
        this.messageService.writeErrorMessage(message);
    }


    public getButtonStatus(): ButtonStatus {
        switch (this.locationService.status) {
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


    /*public getButtonClass(): string {
        const active = this.locationService.isActivated ? ' active' : '';

        switch (this.locationService.status) {
            case LocationServiceStatus.CURRENT:
                return 'btn-success' + active;
            case LocationServiceStatus.WAITING:
                return 'btn-warning' + active;
            case LocationServiceStatus.ERROR:
                return 'btn-danger' + active;
            case LocationServiceStatus.OFF:
            default:
                return 'btn-secondary' + active;
        }
    }*/
}
