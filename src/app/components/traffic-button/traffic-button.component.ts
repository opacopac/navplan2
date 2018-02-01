import { Component, OnInit} from '@angular/core';
import { MapService } from '../../services/map/map.service';
import { LocationService } from '../../services/track/location.service';
import { TrafficService, TrafficServiceStatus} from '../../services/traffic/traffic.service';
import { Traffic } from '../../model/traffic';


const TRAFFIC_TIMEOUT_MS = 10 * 60 * 1000;


@Component({
    selector: 'app-traffic-button',
    templateUrl: './traffic-button.component.html',
    styleUrls: ['./traffic-button.component.css']
})
export class TrafficButtonComponent implements OnInit {
    constructor(
        private locationService: LocationService,
        private trafficService: TrafficService,
        private mapService: MapService) {
    }


    ngOnInit() {
    }


    public getButtonClass(): string {
        const active = this.trafficService.isActivated ? ' active' : '';

        switch (this.trafficService.status) {
            case TrafficServiceStatus.CURRENT:
                return 'btn-success' + active;
            case TrafficServiceStatus.WAITING:
                return 'btn-warning' + active;
            case TrafficServiceStatus.ERROR:
                return 'btn-danger' + active;
            case TrafficServiceStatus.OFF:
            default:
                return 'btn-secondary' + active;
        }
    }


    public onTrafficClicked() {
        // $scope.stopFollowTraffic(); TODO

        if (!this.trafficService.isActivated) {
            this.trafficService.startWatching(
                this.mapService.getExtent(),
                this.onTrafficUpdated.bind(this),
                this.onTrafficError.bind(this));
        } else {
            this.trafficService.stopWatching();
            this.mapService.drawTraffic(undefined);
        }
    }


    public onTrafficUpdated(trafficList: Traffic[]) {
        this.mapService.drawTraffic(trafficList);
    }


    public onTrafficError(message: string) {
    }


    /*public onTrafficClicked() {
        $scope.globalData.showTraffic = !$scope.globalData.showTraffic;

        this.stopFollowTraffic();

        if ($scope.globalData.showTraffic) {
            $scope.globalData.trafficStatus = "waiting";

            if (!$scope.globalData.trafficTimer)
                $scope.globalData.trafficTimer = window.setInterval(this.onTrafficTimer.bind(this), $scope.trafficTimerIntervallMs);

            $scope.updateTraffic();
        } else {
            $scope.stopTrafficUpdates();
        }
    }


    private onTrafficTimer() {
        if (!$scope.globalData.showLocation && Date.now() > $scope.globalData.lastActivity + TRAFFIC_TIMEOUT_MS) {
            $scope.stopTrafficUpdates();
            $scope.showErrorMessage("Traffic updates automatically turned off after 10 minutes of inactivity");
            $scope.$apply();
        }
        else if ($scope.$route.current.controller == "mapCtrl") {
            $scope.updateTraffic();
        }
    }


    private stopTrafficUpdates() {
        window.clearInterval($scope.globalData.trafficTimer);
        $scope.globalData.showTraffic = false;
        $scope.globalData.trafficTimer = undefined;
        $scope.stopFollowTraffic();
        mapService.drawTraffic(undefined);
        $scope.globalData.trafficStatus = "off";
    }


    private updateTraffic() {
        if (!$scope.globalData.showTraffic) {
            return;
        }

        const pos = this.mapService.getMapPosition();
        if (pos.zoom < $scope.trafficMinZoomlevel)
        {
            $scope.globalData.trafficStatus = "waiting";
            $scope.$apply();
            return;
        }

        var extent = mapService.getViewExtentLatLon();

        trafficService.requestTraffic(extent, $scope.trafficMaxAgeSec, $scope.globalData.settings.maxTrafficAltitudeFt + 1000, $scope.globalData.sessionId, successCallback, errorCallback);

        if ($scope.globalData.trafficStatus != "current") {
            $scope.globalData.trafficStatus = "waiting";
        }

        function successCallback(acList) {
            if (!$scope.globalData.showTraffic)
                return;

            $scope.globalData.trafficStatus = "current";
            mapService.drawTraffic(acList, $scope.globalData.settings.maxTrafficAltitudeFt);

            if ($scope.followTrafficAddress)
                $scope.followTraffic(acList);
        }

        function errorCallback(acList) {
            if (!$scope.globalData.showTraffic)
                return;

            $scope.globalData.trafficStatus = "error";
            mapService.drawTraffic(acList, $scope.globalData.settings.maxTrafficAltitudeFt);
        }
    }


    public followTraffic(acList) {
        var ac = acList[$scope.followTrafficAddress];

        if (!ac || !ac.positions || ac.positions.length == 0)
            return;

        var currentAcPosition = ac.positions[ac.positions.length - 1];

        var latDiff = currentAcPosition.latitude - $scope.followTrafficLastPosition.latitude;
        var lonDiff = currentAcPosition.longitude - $scope.followTrafficLastPosition.longitude;
        var pos = mapService.getMapPosition();

        mapService.setMapPosition(pos.center[1] + latDiff, pos.center[0] + lonDiff, pos.zoom);

        $scope.followTrafficLastPosition = currentAcPosition;
    }


    public onFollowSelectedTraffic() {
        if (this.locationService.isActivated) {
            this.locationService.stopWatching();
        }

        this.startFollowTraffic();

        // $scope.closeFeatureOverlay(); TODO
    }


    private startFollowTraffic()
    {
        $scope.followTrafficAddress = $scope.selectedTraffic.acaddress;
        $scope.followTrafficLastPosition = $scope.selectedTraffic.position;

        mapService.setMapPosition($scope.followTrafficLastPosition.latitude, $scope.followTrafficLastPosition.longitude);
    }


    private stopFollowTraffic()
    {
        $scope.followTrafficAddress = undefined;
        $scope.followTrafficLastPosition = undefined;
    }*/
}
