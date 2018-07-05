import * as $ from 'jquery';
import 'rxjs/add/observable/combineLatest';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../services/utils/message.service';
import {SessionService} from '../../services/session/session.service';
import {FlightrouteService} from '../../services/flightroute/flightroute.service';
import {MapService} from '../../services/map/map.service';
import {MapfeaturesService} from '../../services/map/mapfeatures.service';
import {SearchService} from '../../services/search/search.service';
import {MetarTafService} from '../../services/meteo/metar-taf.service';
import {NotamService} from '../../services/notam/notam.service';
import {TrafficService} from '../../services/traffic/traffic.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {SearchBoxComponent} from '../../search/components/search-box/search-box.component';
import {Mapfeatures} from '../../model/mapfeatures';
import {Position2d} from '../../model/geometry/position2d';
import {MetarTaf, MetarTafList} from '../../model/metar-taf';
import {Notam, NotamList} from '../../model/notam';
import {DataItem} from '../../model/data-item';
import {SearchItemList} from '../../search/model/search-item-list';
import {Userpoint} from '../../model/userpoint';
import {Navaid} from '../../model/navaid';
import {Traffic} from '../../model/traffic';
import {Geoname} from '../../model/geoname';
import {Webcam} from '../../model/webcam';
import {Reportingsector} from '../../model/reportingsector';
import {Reportingpoint} from '../../model/reportingpoint';
import {Airport} from '../../model/airport';
import {MapOverlayContainer} from '../map-overlay/map-overlay-container';
import {MapOverlayAirportComponent} from '../map-overlay/map-overlay-airport/map-overlay-airport.component';
import {MapOverlayGeonameComponent} from '../map-overlay/map-overlay-geoname/map-overlay-geoname.component';
import {MapOverlayNavaidComponent} from '../map-overlay/map-overlay-navaid/map-overlay-navaid.component';
import {MapOverlayReportingpointComponent} from '../map-overlay/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import {MapOverlayReportingsectorComponent} from '../map-overlay/map-overlay-reportingsector/map-overlay-reportingsector.component';
import {MapOverlayUserpointComponent} from '../map-overlay/map-overlay-userpoint/map-overlay-userpoint.component';
import {MapOverlayTrafficComponent} from '../map-overlay/map-overlay-traffic/map-overlay-traffic.component';
import {MapOverlayNotamComponent} from '../map-overlay/map-overlay-notam/map-overlay-notam.component';
import {WaypointFactory} from '../../model/waypoint-mapper/waypoint-factory';
import {MapOverlayWaypointComponent} from '../map-overlay/map-overlay-waypoint/map-overlay-waypoint.component';
import {Extent} from '../../model/ol-model/extent';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Waypoint2} from '../../model/flightroute/waypoint2';
import {User} from '../../user/model/user';
import {LocationService} from '../../services/location/location.service';


const NAVBAR_HEIGHT_PX = 54;
const CLICK_SEARCH_RADIUS_PIXEL = 50;
const F3_KEY_CODE = 114;
const F_KEY_CODE = 70;


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;
    @ViewChild(MapOverlayAirportComponent) mapOverlayAirportComponent: MapOverlayAirportComponent;
    @ViewChild(MapOverlayNavaidComponent) mapOverlayNavaidComponent: MapOverlayNavaidComponent;
    @ViewChild(MapOverlayReportingpointComponent) mapOverlayReportingpointComponent: MapOverlayReportingpointComponent;
    @ViewChild(MapOverlayReportingsectorComponent) mapOverlayReportingsectorComponent: MapOverlayReportingsectorComponent;
    @ViewChild(MapOverlayUserpointComponent) mapOverlayUserpointComponent: MapOverlayUserpointComponent;
    @ViewChild(MapOverlayGeonameComponent) mapOverlayGeonameComponent: MapOverlayGeonameComponent;
    @ViewChild(MapOverlayTrafficComponent) mapOverlayTrafficComponent: MapOverlayTrafficComponent;
    @ViewChild(MapOverlayNotamComponent) mapOverlayNotamComponent: MapOverlayNotamComponent;
    @ViewChild(MapOverlayWaypointComponent) mapOverlayWaypointComponent: MapOverlayWaypointComponent;
    @ViewChild(SearchBoxComponent) searchBox: SearchBoxComponent;
    private currentMapFeatures: Mapfeatures;
    private currentMetarTafList: MetarTafList;
    private currentNotamList: NotamList;
    private mapExtentSubscription: Subscription;
    private mapItemClickedSubscription: Subscription;
    private mapClickedSubscription: Subscription;
    private mapOverlayClosedSubscription: Subscription;
    private fullScreenClickedSubscription: Subscription;
    private windowResizeSubscription: Subscription;
    private keyDownSubscription: Subscription;

    public constructor(
        private sessionService: SessionService,
        private messageService: MessageService,
        private trafficService: TrafficService,
        private flightrouteService: FlightrouteService,
        private mapService: MapService,
        private mapFeatureService: MapfeaturesService,
        private locationService: LocationService,
        private searchService: SearchService,
        private metarTafService: MetarTafService,
        private notamService: NotamService) {

        this.session = this.sessionService.getSessionContext();
    }


    // region component life cycle

    public ngOnInit() {
        this.resizeMapToWindow();
        const ownAirplane$ = this.locationService.position$
            .map(pos => pos ? Traffic.createOwnAirplane(pos) : undefined);
        this.mapService.initMap(
            this.session.map.baseMapType,
            this.session.map.position,
            this.session.map.zoom,
            this.session.map.rotation,
            this.session.flightroute$,
            ownAirplane$
        );

        // subscribe to mapservice events
        this.mapExtentSubscription = Observable.combineLatest(
            this.mapService.mapExtent$,
            this.mapService.mapZoom$,
            this.session.user$
        )
            .filter(([extent, zoom, user]) => extent !== undefined && zoom !== undefined)
            .subscribe(([extent, zoom, user]) => {
                this.updateMapContent(extent, zoom, user, false);
            });

        this.mapItemClickedSubscription = this.mapService.mapItemClicked$.subscribe(
            ([dataItem, clickPos]) => {
                this.performSelectItemAction(dataItem, clickPos);
            });

        this.mapClickedSubscription = this.mapService.mapClicked$.subscribe((position: Position2d) => {
            this.searchService.searchByPosition(
                position,
                this.mapService.getRadiusDegByPixel(position, CLICK_SEARCH_RADIUS_PIXEL),
                0, // TODO
                1, // TODO
                this.onSearchByPositionSuccess.bind(this),
                this.onSearchByPositionError.bind(this)
            );
        });


        this.mapOverlayClosedSubscription = this.mapService.mapOverlayClosed$.subscribe(
            () => {
            }); // TODO: databind undef?

        this.fullScreenClickedSubscription = this.mapService.fullScreenClicked$.subscribe(
            () => {
            }); // TODO


        // subscribe to document/window events
        this.windowResizeSubscription = Observable.fromEvent(window, 'resize').subscribe(() => {
            this.resizeMapToWindow();
        });

        this.keyDownSubscription = Observable.fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
            // search: f3 or ctrl + f
            if (event.keyCode === F3_KEY_CODE || (event.ctrlKey && event.keyCode === F_KEY_CODE)) {
                this.searchBox.focus();
                event.preventDefault();
                event.stopPropagation();
            }
        });


        // update map contents
        // this.updateMapContent(true);
    }


    public ngOnDestroy() {
        // unsubscribe from map service events
        this.mapExtentSubscription.unsubscribe();
        this.mapItemClickedSubscription.unsubscribe();
        this.mapClickedSubscription.unsubscribe();
        this.mapOverlayClosedSubscription.unsubscribe();
        this.fullScreenClickedSubscription.unsubscribe();

        // unsubscribe from document/window events
        this.windowResizeSubscription.unsubscribe();
        this.keyDownSubscription.unsubscribe();

        this.mapService.uninitMap();
    }

    // endregion


    // region events

    public onSearchResultSelected(selection: [DataItem, Position2d]) {
        this.performSelectItemAction(selection[0], selection[1]);
        this.mapService.setMapPosition(selection[1], 11);
    }


    public onWaypointChanged() {
        // TODO
    }


    public onOverlayClose() {
        this.mapService.closeOverlay();
    }


    private onSearchByPositionSuccess(searchItems: SearchItemList) {
        this.mapService.drawSearchItemSelection(searchItems);
    }


    private onSearchByPositionError(message: string) {
    }


    private onMapFeaturesLoaded(mapFeatures: Mapfeatures) {
        this.currentMapFeatures = mapFeatures;
        this.mapService.drawMapItems(mapFeatures);

        /*this.metarTafService.load(
            this.mapService.getExtent(),
            this.mapService.getZoom(),
            this.onMetarTafLoaded.bind(this),
            this.onMetarTafLoadError.bind(this));

        this.notamService.load(
            this.mapService.getExtent(),
            this.mapService.getZoom(),
            this.onNotamLoaded.bind(this),
            this.onNotamLoadError.bind(this));*/
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


    private updateMapContent(extent: Extent, zoom: number, user: User, isInitialUpdate: boolean) {
        this.trafficService.setExtent(extent);

        if (!isInitialUpdate &&
            !this.mapFeatureService.needsReload(extent, zoom, user) &&
            !this.metarTafService.needsReload(extent, zoom, user) &&
            !this.notamService.needsReload(extent, zoom, user)) {

            return;
        }

        this.mapFeatureService.load(
            extent,
            this.mapService.getZoom(),
            user,
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
        let clickedWaypoint: Waypoint2;
        this.mapService.closeOverlay();
        this.session.selectedWaypoint = undefined;

        // try to find map feature at this pos & replace dataitem
        if (dataItem instanceof Waypoint2) {
            const origDataItem = this.mapFeatureService.findFlightrouteFeatureByPosition(dataItem.position);
            if (origDataItem) {
                clickedWaypoint = dataItem;
                dataItem = origDataItem;
            }
        }

        // determine overlay & create new waypoint
        if (dataItem instanceof Airport) {
            this.session.selectedWaypoint = WaypointFactory.createNewWaypointFromItem2(dataItem, clickPos);
            overlay = this.mapOverlayAirportComponent;

            // load notams if needed
            if (!this.mapOverlayAirportComponent.airport || !this.mapOverlayAirportComponent.airport.notams
                || this.mapOverlayAirportComponent.airport.notams.length === 0) {
                this.notamService.loadByIcao([dataItem.icao], this.onAirportNotamLoadedSuccess.bind(this),
                    this.onAirportNotamLoadedError.bind(this));
            }
            // load metar / taf if needed
            if (!this.mapOverlayAirportComponent.airport || !this.mapOverlayAirportComponent.airport.metarTaf) {
                this.metarTafService.loadByIcao(dataItem.icao, this.onAirportMetarTafLoadedSuccess.bind(this),
                    this.onAirportMetarTafLoadedError.bind(this));
            }
        } else if (dataItem instanceof Navaid) {
            this.session.selectedWaypoint = WaypointFactory.createNewWaypointFromItem2(dataItem, clickPos);
            overlay = this.mapOverlayNavaidComponent;
        } else if (dataItem instanceof Reportingpoint) {
            this.session.selectedWaypoint = WaypointFactory.createNewWaypointFromItem2(dataItem, clickPos);
            overlay = this.mapOverlayReportingpointComponent;
        } else if (dataItem instanceof Reportingsector) {
            this.session.selectedWaypoint = WaypointFactory.createNewWaypointFromItem2(dataItem, clickPos);
            overlay = this.mapOverlayReportingsectorComponent;
        } else if (dataItem instanceof Userpoint) {
            this.session.selectedWaypoint = WaypointFactory.createNewWaypointFromItem2(dataItem, clickPos);
            overlay = this.mapOverlayUserpointComponent;
        } else if (dataItem instanceof Geoname) {
            this.session.selectedWaypoint = WaypointFactory.createNewWaypointFromItem2(dataItem, clickPos);
            overlay = this.mapOverlayGeonameComponent;
        } else if (dataItem instanceof Notam) {
            overlay = this.mapOverlayNotamComponent;
        } else if (dataItem instanceof Traffic) {
            overlay = this.mapOverlayTrafficComponent;
        } else if (dataItem instanceof Webcam) {
            window.open(dataItem.url, '_blank');
            return;
        } else if (dataItem instanceof Waypoint2) {
            // TODO
            // dataItem.isNew = false;
            this.session.selectedWaypoint = dataItem;
            overlay = this.mapOverlayWaypointComponent;
        } else {
            return;
        }

        if (clickedWaypoint) {
            // TODO
            // this.session.selectedWaypoint.isNew = false;
            this.session.selectedWaypoint = clickedWaypoint;
        }

        overlay.bindFeatureData(dataItem, clickPos);
        this.mapService.addOverlay(overlay.getPosition(), overlay.getContainerHtmlElement(), true);
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
