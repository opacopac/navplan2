import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapOverlayMetarTafComponent } from '../map-overlay/map-overlay-metar-taf/map-overlay-metar-taf.component';
import { MapOverlayNavaidComponent } from '../map-overlay/map-overlay-navaid/map-overlay-navaid.component';
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
import { MetarTafList} from '../../model/metar-taf';
import { NotamList } from '../../model/notam';
import { OlNavaid } from '../../model/ol-model/ol-navaid';
import { OlMetarSky } from '../../model/ol-model/ol-metar-sky';
import { OlTraffic} from '../../model/ol-model/ol-traffic';
import { MapOverlayTrafficComponent } from '../map-overlay/map-overlay-traffic/map-overlay-traffic.component';
import { MapOverlayReportingpointComponent } from '../map-overlay/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import { OlReportingPoint } from '../../model/ol-model/ol-reporting-point';
import { MapOverlayReportingsectorComponent } from '../map-overlay/map-overlay-reportingsector/map-overlay-reportingsector.component';
import { OlReportingSector } from '../../model/ol-model/ol-reporting-sector';


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
    private mapOverlayNavaidContainer: HTMLElement;
    private mapOverlayReportingpointContainer: HTMLElement;
    private mapOverlayReportingsectorContainer: HTMLElement;
    private mapOverlayMetarTafContainer: HTMLElement;
    private mapOverlayTrafficContainer: HTMLElement;

    @ViewChild(MapOverlayNavaidComponent) mapOverlayNavaidComponent: MapOverlayNavaidComponent;
    @ViewChild(MapOverlayReportingpointComponent) mapOverlayReportingpointComponent: MapOverlayReportingpointComponent;
    @ViewChild(MapOverlayReportingsectorComponent) mapOverlayReportingsectorComponent: MapOverlayReportingsectorComponent;
    @ViewChild(MapOverlayMetarTafComponent) mapOverlayMetarTafComponent: MapOverlayMetarTafComponent;
    @ViewChild(MapOverlayTrafficComponent) mapOverlayTrafficComponent: MapOverlayTrafficComponent;


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
        this.mapOverlayNavaidContainer = document.getElementById('navaid-popup');
        this.mapOverlayMetarTafContainer = document.getElementById('metartaf-popup');
        this.mapOverlayTrafficContainer = document.getElementById('traffic-popup');
        this.mapOverlayReportingpointContainer = document.getElementById('reportingpoint-popup');
        this.mapOverlayReportingsectorContainer = document.getElementById('reportingsector-popup');

        this.resizeMapToWindow();
        this.mapService.initMap(
            this.onMovedZoomedRotatedCallback.bind(this),
            this.onMapItemClickedCallback.bind(this),
            this.onMapClickedCallback.bind(this),
            this.onFlightrouteChangedCallback.bind(this),
            this.onFullScreenClickedCallback.bind(this)
        );

        this.updateMap(true);

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
        this.updateMap(false);
    }


    private onMapItemClickedCallback(olFeature: OlFeature, clickPos: Position2d) {
        if (olFeature instanceof OlNavaid) {
            const navaid = (olFeature as OlNavaid).navaid;
            this.mapOverlayNavaidComponent.navaid = navaid;
            this.mapService.addOverlay(navaid.position, this.mapOverlayNavaidContainer, true);
        } else if (olFeature instanceof OlReportingPoint) {
            const reportingpoint = (olFeature as OlReportingPoint).reportingpoint;
            this.mapOverlayReportingpointComponent.reportingpoint = reportingpoint;
            this.mapService.addOverlay(reportingpoint.position, this.mapOverlayReportingpointContainer, true);
        } else if (olFeature instanceof OlReportingSector) {
            const reportingsector = (olFeature as OlReportingSector).reportingSector;
            this.mapOverlayReportingsectorComponent.reportingsector = reportingsector;
            this.mapService.addOverlay(clickPos, this.mapOverlayReportingpointContainer, true);
        } else if (olFeature instanceof OlMetarSky) {
            const metarTaf = (olFeature as OlMetarSky).metarTaf;
            this.mapOverlayMetarTafComponent.metarTaf = metarTaf;
            this.mapService.addOverlay(metarTaf.position, this.mapOverlayMetarTafContainer, true);
        } else if (olFeature instanceof OlTraffic) {
            const traffic = (olFeature as OlTraffic).traffic;
            this.mapOverlayTrafficComponent.traffic = traffic;
            this.mapService.addOverlay(traffic.getCurrentTrafficPosition().position, this.mapOverlayTrafficContainer, true);
        }
    }


    private onMapClickedCallback(position: Position2d) {
    }


    private onFlightrouteChangedCallback() {
    }


    private onFullScreenClickedCallback() {
    }


    private updateMap(isInitialUpdate: boolean) {
        const extent = this.mapService.getExtent();
        this.trafficService.setExtent(extent);

        if (!isInitialUpdate &&
            !this.mapFeatureService.needsReload(extent) &&
            !this.metarTafService.needsReload(extent) &&
            !this.notamService.needsReload(extent)) {

            return;
        }

        this.mapFeatureService.load(
            extent,
            this.onMapFeaturesLoaded.bind(this),
            this.onMapFeaturesLoadError.bind(this)
        );
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
