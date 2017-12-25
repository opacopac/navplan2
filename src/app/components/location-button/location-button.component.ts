import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { FlighttimerService } from '../../services/flighttimer.service';
import { MessageService } from '../../services/message.service';
import { LocationService, LocationServiceStatus } from '../../services/location.service';
import {Traffic, TrafficPosition, TrafficPositionMethod, TrafficType} from '../../model/map/traffic';
import { Position4d } from '../../model/position';


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent implements OnInit {
    private ownPlane: Traffic;

    constructor(
        private messageService: MessageService,
        private mapService: MapService,
        public locationService: LocationService,
        public timerService: FlighttimerService) {
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
                '',
                TrafficType.OWN,
                '',
                '',
                '',
                '',
                []);
    }


    private onLocationChanged(currentPosition: Position4d) {
        // draw own plane
        const trafficPos = new TrafficPosition(currentPosition, TrafficPositionMethod.OWN, '', Date.now());
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


    public getButtonClass(): string {
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
    }
}
