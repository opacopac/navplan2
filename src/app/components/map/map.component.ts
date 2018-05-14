import * as $ from 'jquery';
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { MessageService } from '../../services/utils/message.service';
import { SessionService } from '../../services/utils/session.service';
import { MapService } from '../../services/map/map.service';
import { MapfeaturesService } from '../../services/map/mapfeatures.service';
import { SearchService } from '../../services/search/search.service';
import { MetarTafService } from '../../services/meteo/metar-taf.service';
import { NotamService } from '../../services/notam/notam.service';
import { TrafficService } from '../../services/traffic/traffic.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { Mapfeatures } from '../../model/mapfeatures';
import { Position2d } from '../../model/position';
import { MetarTaf, MetarTafList} from '../../model/metar-taf';
import { Notam, NotamList} from '../../model/notam';
import { DataItem } from '../../model/data-item';
import { SearchItemList } from '../../model/search-item';
import { Userpoint} from '../../model/userpoint';
import { Navaid} from '../../model/navaid';
import { Traffic} from '../../model/traffic';
import { Geoname} from '../../model/geoname';
import { Webcam} from '../../model/webcam';
import { Reportingsector} from '../../model/reportingsector';
import { Waypoint} from '../../model/waypoint';
import { Reportingpoint} from '../../model/reportingpoint';
import { Airport} from '../../model/airport';
import { MapOverlayContainer} from '../map-overlay/map-overlay-container';
import { MapOverlayAirportComponent} from '../map-overlay/map-overlay-airport/map-overlay-airport.component';
import { MapOverlayGeonameComponent } from '../map-overlay/map-overlay-geoname/map-overlay-geoname.component';
import { MapOverlayNavaidComponent } from '../map-overlay/map-overlay-navaid/map-overlay-navaid.component';
import { MapOverlayReportingpointComponent } from '../map-overlay/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import { MapOverlayReportingsectorComponent } from '../map-overlay/map-overlay-reportingsector/map-overlay-reportingsector.component';
import { MapOverlayUserpointComponent } from '../map-overlay/map-overlay-userpoint/map-overlay-userpoint.component';
import { MapOverlayTrafficComponent } from '../map-overlay/map-overlay-traffic/map-overlay-traffic.component';
import { MapOverlayNotamComponent } from '../map-overlay/map-overlay-notam/map-overlay-notam.component';


const NAVBAR_HEIGHT_PX = 54;
const CLICK_SEARCH_RADIUS_PIXEL = 50;
const F3_KEY_CODE = 114;
const F_KEY_CODE = 70;


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
    @ViewChild(MapOverlayAirportComponent) mapOverlayAirportComponent: MapOverlayAirportComponent;
    @ViewChild(MapOverlayNavaidComponent) mapOverlayNavaidComponent: MapOverlayNavaidComponent;
    @ViewChild(MapOverlayReportingpointComponent) mapOverlayReportingpointComponent: MapOverlayReportingpointComponent;
    @ViewChild(MapOverlayReportingsectorComponent) mapOverlayReportingsectorComponent: MapOverlayReportingsectorComponent;
    @ViewChild(MapOverlayUserpointComponent) mapOverlayUserpointComponent: MapOverlayUserpointComponent;
    @ViewChild(MapOverlayGeonameComponent) mapOverlayGeonameComponent: MapOverlayGeonameComponent;
    @ViewChild(MapOverlayTrafficComponent) mapOverlayTrafficComponent: MapOverlayTrafficComponent;
    @ViewChild(MapOverlayNotamComponent) mapOverlayNotamComponent: MapOverlayNotamComponent;
    @ViewChild(SearchBoxComponent) searchBox: SearchBoxComponent;
    @HostListener('window:keydown', ['$event']) keydown(event) { this.onKeyDown(event); }


    public constructor(
        private sessionService: SessionService,
        private messageService: MessageService,
        private trafficService: TrafficService,
        private mapService: MapService,
        private mapFeatureService: MapfeaturesService,
        private searchService: SearchService,
        private metarTafService: MetarTafService,
        private notamService: NotamService) {

        this.session = this.sessionService.getSessionContext();
    }


    // region events

    public ngOnInit() {
        this.resizeMapToWindow();
        this.mapService.initMap(
            this.onMovedZoomedRotatedCallback.bind(this),
            this.onMapItemClickedCallback.bind(this),
            this.onMapClickedCallback.bind(this),
            this.onMapOverlayClosedCallback.bind(this),
            this.onFlightrouteChangedCallback.bind(this),
            this.onFullScreenClickedCallback.bind(this)
        );

        this.updateMap(true);

        if (this.session.flightroute) {
            this.mapService.drawFlightRoute(this.session.flightroute);
        }
    }


    public onKeyDown(event: KeyboardEvent) {
        // search: f3 or ctrl + f
        if (event.keyCode === F3_KEY_CODE || (event.ctrlKey && event.keyCode === F_KEY_CODE)) {
            this.searchBox.focus();
            event.preventDefault();
            event.stopPropagation();
        }
    }


    public onSearchResultSelected(selection: [DataItem, Position2d]) {
        this.performSelectItemAction(selection[0], selection[1]);
        this.mapService.setMapPosition(selection[1], 11);
    }


    public onResize() {
        this.resizeMapToWindow();
    }


    private onMovedZoomedRotatedCallback() {
        this.updateMap(false);
    }


    private onMapItemClickedCallback(dataItem: DataItem, clickPos: Position2d) {
        this.performSelectItemAction(dataItem, clickPos);
    }


    private onMapOverlayClosedCallback() {
        // TODO: databind undef?
    }


    public onOverlayClose() {
        this.mapService.closeOverlay();
    }


    private onMapClickedCallback(position: Position2d) {
        this.searchService.searchByPosition(
            position,
            this.mapService.getRadiusDegByPixel(position, CLICK_SEARCH_RADIUS_PIXEL),
            0, // TODO
            1, // TODO
            this.onSearchByPositionSuccess.bind(this),
            this.onSearchByPositionError.bind(this)
        );
    }


    private onSearchByPositionSuccess(searchItems: SearchItemList) {
        this.mapService.drawSearchItemSelection(searchItems);
    }


    private onSearchByPositionError(message: string) {
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
            this.mapService.getZoom(),
            this.onMetarTafLoaded.bind(this),
            this.onMetarTafLoadError.bind(this));

        this.notamService.load(
            this.mapService.getExtent(),
            this.mapService.getZoom(),
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


    // endregion


    private updateMap(isInitialUpdate: boolean) {
        const extent = this.mapService.getExtent();
        const zoom = this.mapService.getZoom();
        this.trafficService.setExtent(extent);

        if (!isInitialUpdate &&
            !this.mapFeatureService.needsReload(extent, zoom) &&
            !this.metarTafService.needsReload(extent, zoom) &&
            !this.notamService.needsReload(extent, zoom)) {

            return;
        }

        this.mapFeatureService.load(
            extent,
            this.mapService.getZoom(),
            this.onMapFeaturesLoaded.bind(this),
            this.onMapFeaturesLoadError.bind(this)
        );
    }


    private resizeMapToWindow() {
        $('#map').offset({top: NAVBAR_HEIGHT_PX, left: 0});
        $('#map').height($(window).height() - NAVBAR_HEIGHT_PX);
        $('#map').width($(window).width());
    }


    private performSelectItemAction(dataItem: DataItem, clickPos: Position2d) {
        let overlay: MapOverlayContainer;
        this.mapService.closeOverlay();

        if (dataItem instanceof Airport) {
            overlay = this.mapOverlayAirportComponent;
            overlay.bindFeatureData(dataItem);

            // load notams
            if (!this.mapOverlayAirportComponent.airport || !this.mapOverlayAirportComponent.airport.notams
                || this.mapOverlayAirportComponent.airport.notams.length === 0) {
                this.notamService.loadByIcao([dataItem.icao], this.onAirportNotamLoadedSuccess.bind(this),
                    this.onAirportNotamLoadedError.bind(this));
            }
            // load metar / taf
            if (!this.mapOverlayAirportComponent.airport || !this.mapOverlayAirportComponent.airport.metarTaf) {
                this.metarTafService.loadByIcao(dataItem.icao, this.onAirportMetarTafLoadedSuccess.bind(this),
                    this.onAirportMetarTafLoadedError.bind(this));
            }
        } else if (dataItem instanceof Navaid) {
            overlay = this.mapOverlayNavaidComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Reportingpoint) {
            overlay = this.mapOverlayReportingpointComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Reportingsector) {
            overlay = this.mapOverlayReportingsectorComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Userpoint) {
            overlay = this.mapOverlayUserpointComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Geoname) {
            overlay = this.mapOverlayGeonameComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Notam) {
            overlay = this.mapOverlayNotamComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Traffic) {
            overlay = this.mapOverlayTrafficComponent;
            overlay.bindFeatureData(dataItem);
        } else if (dataItem instanceof Webcam) {
            window.open(dataItem.url, '_blank');
            return;
        } else {
            return;
        }

        this.mapService.addOverlay(overlay.getPosition(clickPos), overlay.getContainerHtmlElement(), true);
    }


    private onAirportNotamLoadedSuccess(notamList: NotamList) {
        if (this.mapOverlayAirportComponent.airport) {
            this.mapOverlayAirportComponent.airport.notams = notamList.items;
        }
    }


    private onAirportNotamLoadedError(message: string) {
    }


    private onAirportMetarTafLoadedSuccess(metarTaf: MetarTaf) {
        if (this.mapOverlayAirportComponent.airport) {
            this.mapOverlayAirportComponent.airport.metarTaf = metarTaf;
        }
    }


    private onAirportMetarTafLoadedError(message: string) {
    }
}
