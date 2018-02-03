import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/utils/message.service';
import { SessionService } from '../../services/utils/session.service';
import { MapService } from '../../services/map/map.service';
import { MapfeaturesService } from '../../services/map/mapfeatures.service';
import { MetarTafService } from '../../services/meteo/metar-taf.service';
import { NotamService } from '../../services/notam/notam.service';
import { TrafficService } from '../../services/traffic/traffic.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { Mapfeatures } from '../../model/mapfeatures';
import { Position2d } from '../../model/position';
import { OlFeature } from '../../model/ol-model/ol-feature';
import { MetarTafList } from '../../model/metar-taf';
import { NotamList } from '../../model/notam';

const NAVBAR_HEIGHT_PX = 54;


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    public session: Sessioncontext;
    private currentMapFeatures: Mapfeatures;
    private currentMetarTafList: MetarTafList;
    private currentNotamList: NotamList;



    constructor(
        private sessionService: SessionService,
        private messageService: MessageService,
        private trafficService: TrafficService,
        private mapService: MapService,
        private mapFeatureService: MapfeaturesService,
        private metarTafService: MetarTafService,
        private notamService: NotamService) {

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
            this.onMapFeaturesLoaded.bind(this),
            this.onMapFeaturesLoadError.bind(this)
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


    private onMapFeaturesLoaded(mapFeatures: Mapfeatures) {
        this.currentMapFeatures = mapFeatures;
        this.mapService.drawMapFeatures(mapFeatures);

        this.metarTafService.load(
            this.mapService.getExtent(),
            this.onMetarTafLoaded.bind(this),
            this.onMetarTafLoadError.bind(this));

        this.notamService.load(
            this.mapService.getExtent(),
            this.onNotamLoaded.bind(this),
            this.onNotamLoadError.bind(this));
    }


    private onMapFeaturesLoadError(message: string) {
        // TODO
    }


    private onMetarTafLoaded(metarTafList: MetarTafList) {
        this.currentMetarTafList = metarTafList;

        // add positions (from airports)
        for (const metarTaf of metarTafList.items) {
            const ad = this.currentMapFeatures.getAirportByIcao(metarTaf.ad_icao);
            if (ad) {
                metarTaf.position = ad.position;
            }
        }

        this.mapService.drawMetarTaf(metarTafList);
    }

    private onMetarTafLoadError(message: string) {
        // TODO
    }


    private onNotamLoaded(notamList: NotamList) {
        this.currentNotamList = notamList;

        this.mapService.drawNotams(notamList);
    }


    private onNotamLoadError(message: string) {
        // TODO
    }
}
