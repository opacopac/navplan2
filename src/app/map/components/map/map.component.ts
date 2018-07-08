import 'rxjs/add/observable/combineLatest';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlightrouteService} from '../../../flightroute/services/flightroute/flightroute.service';
import {MapService} from '../../services/map.service';
import {MapfeaturesService} from '../../../map-features/services/mapfeatures.service';
import {SearchService} from '../../../search/services/search/search.service';
import {MetarTafService} from '../../../metar-taf/services/metar-taf.service';
import {NotamService} from '../../../notam/services/notam.service';
import {TrafficService} from '../../../traffic/services/traffic.service';
import {SearchBoxComponent} from '../../../search/components/search-box/search-box.component';
import {Mapfeatures} from '../../../map-features/model/mapfeatures';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {DataItem} from '../../../shared/model/data-item';
import {SearchItemList} from '../../../search/model/search-item-list';
import {MapOverlayAirportComponent} from '../../../map-features/components/map-overlay-airport/map-overlay-airport.component';
import {MapOverlayGeonameComponent} from '../../../map-features/components/map-overlay-geoname/map-overlay-geoname.component';
import {MapOverlayNavaidComponent} from '../../../map-features/components/map-overlay-navaid/map-overlay-navaid.component';
import {MapOverlayReportingpointComponent} from '../../../map-features/components/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import {MapOverlayReportingsectorComponent} from '../../../map-features/components/map-overlay-reportingsector/map-overlay-reportingsector.component';
import {MapOverlayUserpointComponent} from '../../../map-features/components/map-overlay-userpoint/map-overlay-userpoint.component';
import {MapOverlayTrafficComponent} from '../../../traffic/components/map-overlay-traffic/map-overlay-traffic.component';
import {MapOverlayNotamComponent} from '../../../notam/components/map-overlay-notam/map-overlay-notam.component';
import {MapOverlayWaypointComponent} from '../../../flightroute/components/map-overlay-waypoint/map-overlay-waypoint.component';
import {Extent} from '../../../shared/model/extent';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../user/model/user';
import {LocationService} from '../../../location/services/location/location.service';
import {MessageService} from '../../../shared/services/message/message.service';
import {Store} from '@ngrx/store';
import {MapBackgroundClickedAction, MapFeatureClickedAction, MapMovedZoomedRotatedAction} from '../../map.actions';
import {Angle} from '../../../shared/model/quantities/angle';
import {getMapPosition, getMapRotation, getMapZoom} from '../../map.selectors';
import {take} from 'rxjs/operators';
import {MapbaselayerType} from '../../model/mapbaselayer-factory';


const CLICK_SEARCH_RADIUS_PIXEL = 50;
const F3_KEY_CODE = 114;
const F_KEY_CODE = 70;


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
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
    private mapMovedZoomedRotatedSubscription: Subscription;
    private windowResizeSubscription: Subscription;
    private keyDownSubscription: Subscription;
    private mapPosition$: Observable<Position2d>;
    private mapZoom$: Observable<number>;
    private mapRotation$: Observable<Angle>;

    public constructor(
        private appStore: Store<any>,
        private messageService: MessageService,
        private trafficService: TrafficService,
        private flightrouteService: FlightrouteService,
        private mapService: MapService,
        private mapFeatureService: MapfeaturesService,
        private locationService: LocationService,
        private searchService: SearchService,
        private metarTafService: MetarTafService,
        private notamService: NotamService) {

        this.mapPosition$ = this.appStore.select(getMapPosition);
        this.mapZoom$ = this.appStore.select(getMapZoom);
        this.mapRotation$ = this.appStore.select(getMapRotation);
    }


    // region component life cycle

    public ngOnInit() {
        this.initMapAndFeaturesAsync();

        this.mapMovedZoomedRotatedSubscription = this.mapService.onMapMovedZoomedRotated.subscribe(event => {
            this.dispatchPosZoomRotAction(event.position, event.zoom, event.rotation, event.extent);
        });


        /*const ownAirplane$ = this.locationService.position$
            .map(pos => pos ? Traffic.createOwnAirplane(pos) : undefined);
        this.mapService.initMap(
            this.session.map.baseMapType,
            this.session.map.position,
            this.session.map.zoom,
            this.session.map.rotation);*/

        // subscribe to mapservice events
        /*this.mapExtentSubscription = Observable.combineLatest(
            this.mapService.mapExtent$,
            this.mapService.mapZoom$,
            this.session.user$
        )
            .filter(([extent, zoom, user]) => extent !== undefined && zoom !== undefined)
            .subscribe(([extent, zoom, user]) => {
                this.updateMapContent(extent, zoom, user, false);
            });*/

        /*this.mapItemClickedSubscription = this.mapService.mapItemClicked$.subscribe(
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
        });*/


        /*this.mapOverlayClosedSubscription = this.mapService.mapOverlayClosed$.subscribe(
            () => {
            }); // TODO: databind undef?

        this.fullScreenClickedSubscription = this.mapService.fullScreenClicked$.subscribe(
            () => {
            }); // TODO
*/

        // subscribe to document/window events
        this.windowResizeSubscription = Observable.fromEvent(window, 'resize').subscribe(() => {
            // TODO
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


    private initMapAndFeaturesAsync() {
        Observable.combineLatest(
            this.mapPosition$,
            this.mapZoom$,
            this.mapRotation$
        ).pipe(
            take(1)
        ).subscribe(([pos, zoom, rot]) => {
            this.mapService.initMap(
                MapbaselayerType.OPENTOPOMAP, // TODO
                pos,
                zoom,
                rot);

            // TODO: features
        });
    }


    public ngOnDestroy() {
        // unsubscribe from map service events
        /*this.mapExtentSubscription.unsubscribe();
        this.mapItemClickedSubscription.unsubscribe();
        this.mapClickedSubscription.unsubscribe();
        this.mapOverlayClosedSubscription.unsubscribe();
        this.fullScreenClickedSubscription.unsubscribe();*/

        this.mapMovedZoomedRotatedSubscription.unsubscribe();

        // unsubscribe from document/window events
        this.windowResizeSubscription.unsubscribe();
        this.keyDownSubscription.unsubscribe();

        this.mapService.uninitMap();
    }

    // endregion


    // region events


    private dispatchPosZoomRotAction(position: Position2d, zoom: number, rotation: Angle, extent: Extent) {
        this.appStore.dispatch(
            new MapMovedZoomedRotatedAction(
                position as Position2d,
                zoom as number,
                rotation as Angle,
                extent as Extent)
        );
    }


    private dispatchFeatureClickedAction([feature, position]) {
        this.appStore.dispatch(
            new MapFeatureClickedAction(
                feature as DataItem,
                position as Position2d)
        );
    }


    private dispatchBackgroundClickedAction(position) {
        this.appStore.dispatch(
            new MapBackgroundClickedAction(position)
        );
    }


    public onSearchResultSelected(selection: [DataItem, Position2d]) {
        this.performSelectItemAction(selection[0], selection[1]);
        this.mapService.setPosition(selection[1], 11);
    }


    public onWaypointChanged() {
        // TODO
    }


    private onSearchByPositionSuccess(searchItems: SearchItemList) {
        // this.mapService.drawSearchItemSelection(searchItems);
    }


    private onSearchByPositionError(message: string) {
    }


    private onMapFeaturesLoaded(mapFeatures: Mapfeatures) {
        /*this.currentMapFeatures = mapFeatures;
        this.mapService.drawMapItems(mapFeatures);*/

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


    /*private onMetarTafLoaded(metarTafList: MetarTafList) {
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
    }*/

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


    private performSelectItemAction(dataItem: DataItem, clickPos: Position2d) {
        /*let overlay: MapOverlayContainer;
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
        */
    }


    /*private onAirportNotamLoadedSuccess(notamList: NotamList) {
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
    }*/
}
