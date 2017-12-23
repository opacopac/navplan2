import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { FlighttimerService } from '../../services/flighttimer.service';
import {LocationService, LocationServiceStatus} from '../../services/location.service';
import { Position4d } from '../../model/position';
import { MessageService } from '../../services/message.service';
import {Traffic} from "../../model/map/traffic";


@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent implements OnInit {
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
            this.locationService.startWatching(this.onLocationChanged.bind(this), this.onLocationError.bind(this));
            this.timerService.startClockTimer();
        } else {
            this.locationService.stopWatching();
            this.timerService.stopClockTimer();
            this.mapService.drawLocation(undefined);
            // $scope.storeTrackLocal(); TODO
        }
    }


    private onLocationChanged(currentPosition: Position4d) {
        const lastPositions = this.locationService.lastPositions;
        const ownPlane = Traffic.getOwnAirplane(lastPositions);

        this.mapService.drawLocation(ownPlane);

        /*this.mapService.drawOwnPlane(lastPositions);

        if ($scope.globalData.showLocation)
        {
            var lastIdx = lastPositions.length - 1;

            if (lastIdx >= 1)
            {
                var latDiff = lastPositions[lastIdx].latitude - lastPositions[lastIdx - 1].latitude;
                var lonDiff = lastPositions[lastIdx].longitude - lastPositions[lastIdx - 1].longitude;
                var pos = mapService.getMapPosition();

                mapService.setMapPosition(pos.center[1] + latDiff, pos.center[0] + lonDiff, pos.zoom);
            }
            else
                mapService.setMapPosition(currentPosition.coords.latitude, currentPosition.coords.longitude);
        }*/
    }


    private onLocationError(message: string) {
        this.messageService.writeErrorMessage(message);
    }


    public getButtonClass(): string {
        const active = this.locationService.isActivated ? ' active' : '';

        switch (this.locationService.status) {
            case LocationServiceStatus.current:
                return 'btn-success' + active;
            case LocationServiceStatus.waiting:
                return 'btn-warning' + active;
            case LocationServiceStatus.error:
                return 'btn-danger' + active;
            default:
                return 'btn-secondary' + active;
        }
    }
}
