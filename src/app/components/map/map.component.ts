import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MessageService } from '../../services/message.service';
import { SessionService } from '../../services/session.service';
import { MapService } from '../../services/map.service';
import { MapfeaturesService } from '../../services/mapfeatures.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Mapfeatures } from '../../model/map/mapfeatures';
import {MapItemModel} from "../../model/map/map-item-model";
import {Position2d} from "../../model/position";

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
            this.onFullScreenClickedCallback.bind(this)
        );
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
        this.mapFeatureService.getMapFeatures(
            this.mapService.getExtent(),
            this.onMapFeaturesReceived.bind(this),
            this.onMapFeaturesError.bind(this)
        );
    }


    private onMapItemClickedCallback(mapItem: MapItemModel) {
    }


    private onMapClickedCallback(position: Position2d) {
    }


    private onFullScreenClickedCallback() {
    }


    private onMapFeaturesReceived(mapFeatures: Mapfeatures) {
        this.mapService.drawMapFeatures(mapFeatures);
    }


    private onMapFeaturesError(message: string) {
    }
}
