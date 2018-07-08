import 'rxjs/add/observable/combineLatest';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {MapService} from '../../services/map.service';
import {SearchBoxComponent} from '../../../search/components/search-box/search-box.component';
import {Position2d} from '../../../shared/model/geometry/position2d';
import {DataItem} from '../../../shared/model/data-item';
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
import {MapClickedAction, MapMovedZoomedRotatedAction} from '../../map.actions';
import {Angle} from '../../../shared/model/quantities/angle';
import {getMapPosition, getMapRotation, getMapZoom} from '../../map.selectors';
import {MapbaselayerType} from '../../model/mapbaselayer-factory';
import {OlMapFeaturesContainer} from '../../../map-features/ol-components/ol-map-features-container';
import {MapContext} from '../../model/map-context';


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
    private olMapFeatures: OlMapFeaturesContainer;
    private mapMovedZoomedRotatedSubscription: Subscription;
    private mapClickedSubscription: Subscription;
    private mapPosition$: Observable<Position2d>;
    private mapZoom$: Observable<number>;
    private mapRotation$: Observable<Angle>;

    public constructor(
        private appStore: Store<any>,
        private mapService: MapService) {

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

        this.mapClickedSubscription = this.mapService.onMapClicked.subscribe(event => {
            this.dispatchMapClickedAction(event.clickPos, event.dataItem);
        });
    }


    public ngOnDestroy() {
        this.olMapFeatures.destroy();

        this.mapMovedZoomedRotatedSubscription.unsubscribe();
        this.mapClickedSubscription.unsubscribe();

        this.mapService.uninitMap();
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

            const mapContext = new MapContext(this.appStore, this.mapService.map, this.mapService);
            this.olMapFeatures = new OlMapFeaturesContainer(mapContext);
            // TODO: features
        });
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


    private dispatchMapClickedAction(clickPos: Position2d, dataItem: DataItem) {
        this.appStore.dispatch(
            new MapClickedAction(
                clickPos,
                dataItem
            )
        );
    }

    // endregion
}
