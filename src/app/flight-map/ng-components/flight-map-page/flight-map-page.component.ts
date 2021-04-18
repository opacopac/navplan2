import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseMapZoomInAction, BaseMapZoomOutAction} from '../../../base-map/ngrx/base-map.actions';
import {OlOverlayContainerComponent} from '../ol-overlay-container/ol-overlay-container.component';
import {OlBaseMapService} from '../../../base-map/ol-service/ol-base-map.service';
import {Position2d} from '../../../common/geo-math/domain-model/geometry/position2d';
import {Angle} from '../../../common/geo-math/domain-model/quantities/angle';
import {combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';
import {getMapPosition, getMapRotation, getMapZoom} from '../../../base-map/ngrx/base-map.selectors';
import {OlOpenAipItemsContainer} from '../../../open-aip/ol-components/ol-open-aip-items-container';
import {getOpenAipAirports, getOpenAipItems} from '../../../open-aip/ngrx/open-aip.selectors';
import {OlMetarContainer} from '../../../metar-taf/ol-components/ol-metar-container';
import {getMetarTafList} from '../../../metar-taf/ngrx/metar-taf.selectors';
import {OlNotamContainer} from '../../../notam/ol-components/ol-notam-container';
import {getNotamList} from '../../../notam/ngrx/notam.selectors';
import {OlTrackContainer} from '../../../track/ol-components/ol-track-container';
import {getShowTrack} from '../../../track/ngrx/track.selectors';
import {OlFlightrouteContainer} from '../../../flightroute/ol-components/ol-flightroute-container';
import {getFlightroute} from '../../../flightroute/ngrx/flightroute.selectors';
import {OlTrafficContainer} from '../../../traffic/ol-components/ol-traffic-container';
import {getTrafficState} from '../../../traffic/ngrx/traffic.selectors';
import {OlOwnPlaneContainer} from '../../../location/ol-components/ol-own-plane-container';
import {getLocationState} from '../../../location/location.selectors';
import {MapBaseLayerType} from '../../../base-map/domain-model/map-base-layer-type';


@Component({
    selector: 'app-flight-map-page',
    templateUrl: './flight-map-page.component.html',
    styleUrls: ['./flight-map-page.component.css']
})
export class FlightMapPageComponent implements OnInit, OnDestroy {
    @ViewChild(OlOverlayContainerComponent) mapOverlayContainer: OlOverlayContainerComponent;
    private olOpenAipItems: OlOpenAipItemsContainer;
    private olFlightroute: OlFlightrouteContainer;
    private olTrack: OlTrackContainer;
    private olNotams: OlNotamContainer;
    private olMetars: OlMetarContainer;
    private olTraffic: OlTrafficContainer;
    private olOwnPlane: OlOwnPlaneContainer;

    constructor(
        private readonly appStore: Store<any>,
        private readonly mapService: OlBaseMapService
    ) {
    }


    ngOnInit() {
        combineLatest([
            this.appStore.pipe(select(getMapPosition)),
            this.appStore.pipe(select(getMapZoom)),
            this.appStore.pipe(select(getMapRotation))
        ]).pipe(
            take(1)
        ).subscribe(([pos, zoom, rot]) => {
            this.init(pos, zoom, rot);
        });
    }


    ngOnDestroy() {
        this.olOpenAipItems.destroy();
        this.olMetars.destroy();
        this.olNotams.destroy();
        this.olTrack.destroy();
        this.olFlightroute.destroy();
        // TODO: destroy search result layer
        this.olTraffic.destroy();
        this.olOwnPlane.destroy();
    }


    private init(
        position: Position2d,
        zoom: number,
        rotation: Angle
    ) {
        const flightrouteLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const ownPlaneLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const metarTafLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const notamLayer = OlBaseMapService.createEmptyVectorLayer(true);
        const airspaceLayer = OlBaseMapService.createEmptyVectorLayer(true);
        const reportingSectorLayer = OlBaseMapService.createEmptyVectorLayer(true);
        const webcamLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const userPointLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const reportingPointLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const navaidLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const airportLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const trackLayer = OlBaseMapService.createEmptyVectorLayer(false);
        const trafficLayer = OlBaseMapService.createEmptyVectorLayer(false);

        this.mapService.initMap(
            MapBaseLayerType.OPENTOPOMAP,
            [
                flightrouteLayer,
                ownPlaneLayer,
                metarTafLayer,
                notamLayer,
                airspaceLayer,
                reportingSectorLayer,
                webcamLayer,
                userPointLayer,
                reportingPointLayer,
                navaidLayer,
                airportLayer,
                trackLayer,
                trafficLayer
            ],
            position,
            zoom,
            rotation
        );

        this.olOpenAipItems = new OlOpenAipItemsContainer(
            airspaceLayer,
            reportingSectorLayer,
            webcamLayer,
            userPointLayer,
            reportingPointLayer,
            navaidLayer,
            airportLayer,
            this.appStore.pipe(select(getOpenAipItems))
        );
        this.olMetars = new OlMetarContainer(
            metarTafLayer,
            this.appStore.pipe(select(getMetarTafList)),
            this.appStore.pipe(select(getOpenAipAirports)),
            this.mapService.getRotation()
        );
        this.olNotams = new OlNotamContainer(
            notamLayer,
            this.appStore.pipe(select(getNotamList))
        );
        this.olTrack = new OlTrackContainer(
            trackLayer,
            this.appStore.pipe(select(getShowTrack))
        );
        this.olFlightroute = new OlFlightrouteContainer(
            flightrouteLayer,
            this.appStore.pipe(select(getFlightroute)),
            this.olOpenAipItems.getSnapToLayers(),
            this.appStore,
            rotation
        );
        // TODO: search results
        this.olTraffic = new OlTrafficContainer(
            trafficLayer,
            this.appStore.pipe(select(getTrafficState))
        );
        this.olOwnPlane = new OlOwnPlaneContainer(
            ownPlaneLayer,
            this.appStore.pipe(select(getLocationState))
        );
    }


    public onZoomInClicked() {
        this.appStore.dispatch(
            new BaseMapZoomInAction()
        );
    }


    public onZoomOutClicked() {
        this.appStore.dispatch(
            new BaseMapZoomOutAction()
        );
    }
}
