import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/utils/message.service';
import { SessionService } from '../../services/utils/session.service';
import { MapService } from '../../services/map/map.service';
import { MapfeaturesService } from '../../services/map/mapfeatures.service';
import { TrafficService } from '../../services/traffic/traffic.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Mapfeatures } from '../../model/mapfeatures';
import { Position2d } from '../../model/position';
import { OlFeature } from '../../model/ol-model/ol-feature';

const NAVBAR_HEIGHT_PX = 54;


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    public session: Sessioncontext;


    constructor(
        private sessionService: SessionService,
        private messageService: MessageService,
        private trafficService: TrafficService,
        private mapService: MapService,
        private mapFeatureService: MapfeaturesService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
        this.resizeMapToWindow();
        this.mapService.initMap(
            this.onMovedZoomedRotatedCallback.bind(this),
            this.onMapItemClickedCallback.bind(this),
            this.onMapClickedCallback.bind(this),
            this.onFlightrouteChangedCallback.bind(this),
            this.onFullScreenClickedCallback.bind(this)
        );

        if (this.session.flightroute) {
            this.mapService.drawFlightRoute(this.session.flightroute);
        }
    }


    onResize() {
        this.resizeMapToWindow();
    }


    private resizeMapToWindow() {
        $('#map').offset({top: NAVBAR_HEIGHT_PX, left: 0});
        $('#map').height($(window).height() - NAVBAR_HEIGHT_PX);
        $('#map').width($(window).width());
    }


    private onMovedZoomedRotatedCallback() {
        this.trafficService.setExtent(this.mapService.getExtent());
        this.mapFeatureService.load(
            this.mapService.getExtent(),
            this.onMapFeaturesReceived.bind(this),
            this.onMapFeaturesError.bind(this)
        );
    }


    private onMapItemClickedCallback(olFeature: OlFeature) {
    }


    private onMapClickedCallback(position: Position2d) {
    }


    private onFlightrouteChangedCallback() {
    }


    private onFullScreenClickedCallback() {
    }


    private onMapFeaturesReceived(mapFeatures: Mapfeatures) {
        this.mapService.drawMapFeatures(mapFeatures);
    }


    private onMapFeaturesError(message: string) {
    }
}
