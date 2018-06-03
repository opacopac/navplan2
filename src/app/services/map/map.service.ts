import * as ol from 'openlayers';
import * as Rx from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionService } from '../utils/session.service';
import { Sessioncontext } from '../../model/sessioncontext';
import { MapbaselayerFactory } from '../../model/ol-model/mapbaselayer-factory';
import { Extent } from '../../model/ol-model/extent';
import { Position2d } from '../../model/position';
import { Mapfeatures } from '../../model/mapfeatures';
import { MetarTafList } from '../../model/metar-taf';
import { Flightroute } from '../../model/flightroute';
import { Traffic } from '../../model/traffic';
import { NotamList } from '../../model/notam';
import { OlFlightroute } from '../../model/ol-model/ol-flightroute';
import { OlTraffic } from '../../model/ol-model/ol-traffic';
import { OlWebcam } from '../../model/ol-model/ol-webcam';
import { OlNavaid } from '../../model/ol-model/ol-navaid';
import { OlFeature} from '../../model/ol-model/ol-feature';
import { OlAirport } from '../../model/ol-model/ol-airport';
import { OlReportingPoint } from '../../model/ol-model/ol-reporting-point';
import { OlReportingSector } from '../../model/ol-model/ol-reporting-sector';
import { OlUserPoint } from '../../model/ol-model/ol-user-point';
import { OlMapfeatureList } from '../../model/ol-model/ol-mapfeature-list';
import { OlMetar } from '../../model/ol-model/ol-metar';
import { OlMetarWind } from '../../model/ol-model/ol-metar-wind';
import { OlMetarSky } from '../../model/ol-model/ol-metar-sky';
import { OlNotam } from '../../model/ol-model/ol-notam';
import { DataItem } from '../../model/data-item';
import { SearchItemList} from '../../model/search-item';
import { OlSearchItemSelection } from '../../model/ol-model/ol-searchitem-selection';
import { OlSearchItem } from '../../model/ol-model/ol-searchitem';
import {OlWaypoint} from "../../model/ol-model/ol-waypoint";
import {Flightroute2} from "../../model/stream-model/flightroute2";


export class WaypointModification {
    constructor(
        public waypointIndex: number,
        public isNewWaypoint: boolean,
        public newPosition: Position2d) {}
}

const HIT_TOLERANCE_PIXELS = 10;


@Injectable()
export class MapService {
    public mapMovedZoomedRotated$: Rx.Observable<void>;
    public mapItemClicked$: Rx.Observable<[DataItem, Position2d]>;
    public mapClicked$: Rx.Observable<Position2d>;
    public mapOverlayClosed$: Rx.Observable<void>;
    public flightrouteModified$: Rx.Observable<WaypointModification>;
    public fullScreenClicked$: Rx.Observable<void>;
    private map: ol.Map;
    private session: Sessioncontext;
    private mapLayer: ol.layer.Tile;
    private routeItemsLayer: ol.layer.Vector;
    private nonrouteItemsLayer: ol.layer.Vector;
    private notamLayer: ol.layer.Vector;
    private flightrouteLayer: ol.layer.Vector;
    private searchItemLayer: ol.layer.Vector;
    private trafficLayer: ol.layer.Vector;
    private locationLayer: ol.layer.Vector;
    private currentOverlay: ol.Overlay;
    private interactions: ol.interaction.Interaction[];
    private isSearchItemSelectionActive: boolean;
    private routeCoordinatesBeforeModify: ol.Coordinate[];
    private mapMovedZoomedRotatedSource = new Rx.Subject<void>();
    private mapItemClickedSource = new Rx.Subject<[DataItem, Position2d]>();
    private mapClickedSource = new Rx.Subject<Position2d>();
    private mapOverlayClosedSource = new Rx.Subject<void>();
    private mapFlightrouteModifiedSource = new Rx.Subject<WaypointModification>();
    private mapFullScreenClickedSource = new Rx.Subject<void>();
    private flightrouteSubscription: Rx.Subscription;


    constructor(private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
        this.mapMovedZoomedRotated$ = this.mapMovedZoomedRotatedSource.asObservable().debounceTime(100);
        this.mapItemClicked$ = this.mapItemClickedSource.asObservable();
        this.mapClicked$ = this.mapClickedSource.asObservable();
        this.mapOverlayClosed$ = this.mapOverlayClosedSource.asObservable();
        this.flightrouteModified$ = this.mapFlightrouteModifiedSource.asObservable().distinctUntilChanged();
        this.fullScreenClicked$ = this.mapFullScreenClickedSource.asObservable();
    }


    // region init

    public initMap(flightroute?: Rx.Observable<Flightroute2>) {
        // map
        this.initLayers();
        this.interactions = [];

        this.map = new ol.Map({
            target: 'map',
            controls: [
                new ol.control.Attribution(),
                new ol.control.FullScreen(),
                new ol.control.ScaleLine(),
                new ol.control.Rotate()
            ],
            layers: [
                this.mapLayer,
                this.nonrouteItemsLayer,
                this.routeItemsLayer,
                this.notamLayer,
                this.flightrouteLayer,
                this.searchItemLayer,
                this.trafficLayer,
                this.locationLayer
            ],
            view: new ol.View({
                center: this.session.map.position.getMercator(),
                zoom: this.session.map.zoom
            })
        });

        // events
        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.on('singleclick', this.onSingleClick.bind(this));
        this.map.on('pointermove', this.onPointerMove.bind(this));
        this.map.getView().on('change:rotation', this.onViewRotation.bind(this));

        // subscribe to observables
        this.flightrouteSubscription = flightroute.subscribe(
            (flightroute) => { this.updateFlightroute(flightroute); }
        );
    }


    public uninitMap() {
        this.removeInteractions();
        this.map.un('moveend', this.onMoveEnd.bind(this));
        this.map.un('singleclick', this.onSingleClick.bind(this));
        this.map.un('pointermove', this.onPointerMove.bind(this));
        this.map.getView().un('change:rotation', this.onViewRotation.bind(this));
        this.map.setTarget(undefined);
        this.map = undefined;

        this.flightrouteSubscription.unsubscribe();
    }


    private initLayers() {
        this.mapLayer = MapbaselayerFactory.create(this.session.settings.baseMapType);
        this.nonrouteItemsLayer = this.createEmptyVectorLayer(true);
        this.routeItemsLayer = this.createEmptyVectorLayer();
        this.notamLayer = this.createEmptyVectorLayer(true);
        this.flightrouteLayer = this.createEmptyVectorLayer();
        this.searchItemLayer = this.createEmptyVectorLayer();
        this.trafficLayer = this.createEmptyVectorLayer();
        this.locationLayer = this.createEmptyVectorLayer();
    }


    private createEmptyVectorLayer(imageRenderMode: boolean = false): ol.layer.Vector {
        return new ol.layer.Vector({
            source: new ol.source.Vector({}),
            renderMode: imageRenderMode ? 'image' : undefined
        });
    }


    // endregion


    // region map position / size


    public getZoom(): number {
        return this.map.getView().getZoom();
    }


    public setZoom(zoom: number) {
        return this.map.getView().setZoom(zoom);
    }


    public zoomIn() {
        const zoom = this.map.getView().getZoom();
        const maxZoom = (this.mapLayer.getSource() as ol.source.Tile).getTileGrid().getMaxZoom();
        if (zoom < maxZoom) {
            this.map.getView().setZoom(zoom + 1);
        }
    }


    public zoomOut() {
        const zoom = this.map.getView().getZoom();
        const minZoom = (this.mapLayer.getSource() as ol.source.Tile).getTileGrid().getMinZoom();
        if (zoom > minZoom) {
            this.map.getView().setZoom(zoom - 1);
        }
    }


    public getMapPosition(): Position2d {
        return Position2d.createFromMercator(this.map.getView().getCenter());
    }


    public setMapPosition(position: Position2d, zoom?: number) {
        if (!this.map || !this.map.getView()) {
            return;
        }

        if (position) {
            this.map.getView().setCenter(position.getMercator());
        }

        if (zoom != null) {
            this.map.getView().setZoom(zoom);
        }
    }


    public getExtent(): Extent {
        return Extent.createFromMercator(this.map.getView().calculateExtent(this.map.getSize()));
    }


    public getRadiusDegByPixel(position: Position2d, radiusPixel: number): number {
        const coord1Pixel = this.map.getPixelFromCoordinate(position.getMercator());
        const coord2Pixel: ol.Pixel = [coord1Pixel[0], coord1Pixel[1] - radiusPixel];
        const coord2Deg = Position2d.createFromMercator(this.map.getCoordinateFromPixel(coord2Pixel));

        return Math.abs(coord2Deg.latitude - position.latitude);

        /*const clickPos = [event.pixel[0], event.pixel[1]];
        const coord1 = this.map.getCoordinateFromPixel(clickPos);
        const lat1 = ol.proj.toLonLat(coord1)[1];

        clickPos[1] -= 50;
        const coord2 = map.getCoordinateFromPixel(clickPos);
        const lat2 = ol.proj.toLonLat(coord2)[1];

        return Math.abs(lat2 - lat1);*/
    }


    // endregion


    // region draw



    public drawMapItems(mapFeatures: Mapfeatures) {
        // non route items
        const sourceNonRouteItems = this.nonrouteItemsLayer.getSource();
        const sourceRouteItems = this.routeItemsLayer.getSource();
        sourceNonRouteItems.clear();
        sourceRouteItems.clear();

        if (!mapFeatures) {
            return;
        }

        const mapFeaturesOlFeature = new OlMapfeatureList(mapFeatures);
        mapFeaturesOlFeature.draw(sourceNonRouteItems, sourceRouteItems);
    }


    public drawMetarTaf(metarTafList: MetarTafList) {
        const source = this.nonrouteItemsLayer.getSource();

        if (!metarTafList) {
            return;
        }

        for (const metarTaf of metarTafList.items) {
            const metarTafOlFeature = new OlMetar(metarTaf, this.map.getView().getRotation());
            metarTafOlFeature.draw(source);
        }
    }


    public drawLocation(ownPlane: Traffic) {
        const source = this.locationLayer.getSource();
        source.clear();

        if (!ownPlane) {
            return;
        }

        const ownPlaneOlFeature = new OlTraffic(ownPlane);
        ownPlaneOlFeature.draw(source);
    }


    public drawTraffic(trafficList: Traffic[]) {
        const source = this.trafficLayer.getSource();
        source.clear();

        if (!trafficList) {
            return;
        }

        for (const traffic of trafficList) {
            const trafficOlFeature = new OlTraffic(traffic);
            trafficOlFeature.draw(source);
        }
    }


    public drawNotams(notamList: NotamList) {
        const source = this.notamLayer.getSource();
        source.clear();

        if (!notamList) {
            return;
        }

        for (const notam of notamList.items) {
            const notamOlFeature = new OlNotam(notam);
            notamOlFeature.draw(source);
        }
    }


    public drawSearchItemSelection(searchItems: SearchItemList) {
        const source = this.searchItemLayer.getSource();
        source.clear();

        if (!searchItems) {
            return;
        }

        this.isSearchItemSelectionActive = true;
        const searchItemSelectionFeature = new OlSearchItemSelection(searchItems.items);
        searchItemSelectionFeature.draw(source);
    }


    public closeSearchItemSelection() {
        this.searchItemLayer.getSource().clear();
        this.isSearchItemSelectionActive = false;
    }


    public drawFlightRoute(flightroute: Flightroute) {
        this.removeInteractions();
        const source = this.flightrouteLayer.getSource();
        source.clear();

        if (!flightroute || flightroute.waypoints.length === 0) {
            return;
        }

        const olFeature = new OlFlightroute(flightroute);
        olFeature.draw(source, this.map.getView().getRotation());

        // add interactions & remember current coordinates
        if (olFeature.routeLineFeature) {
            this.routeCoordinatesBeforeModify = (olFeature.routeLineFeature.getGeometry() as ol.geom.LineString).getCoordinates();
            this.addModifyInteraction(new ol.Collection<ol.Feature>([olFeature.routeLineFeature]));
            this.addSnapInteractions();
        }
    }


    private updateFlightroute(flightroute: Flightroute2) {
        const source = this.flightrouteLayer.getSource();
        source.clear();

        //flightroute.waypointList$

    }

    // endregion


    // region interactions

    private addModifyInteraction(routeLineFeatures: ol.Collection<ol.Feature>) {
        const modInteraction = new ol.interaction.Modify({
            deleteCondition : function(event) { return false; }, // no delete condition
            features: routeLineFeatures
        });

        modInteraction.on('modifyend', this.onFlightrouteModifyEnd.bind(this));
        this.interactions.push(modInteraction);
        this.map.addInteraction(modInteraction);
    }


    private addSnapInteractions() {
        const snapInteraction = new ol.interaction.Snap({
            source: this.routeItemsLayer.getSource(),
            edge: false
        });

        this.interactions.push(snapInteraction);
        this.map.addInteraction(snapInteraction);
    }


    private removeInteractions() {
        for (let interaction of this.interactions) {
            this.map.removeInteraction(interaction);
        }
    }


    // endregion


    // region overlays

    public addOverlay(coordinates: Position2d, container: HTMLElement, autoPan: boolean) {
        if (this.currentOverlay) {
            this.closeOverlay();
        }

        if (container.style.visibility = 'hidden') {
            container.style.visibility = 'visible';
        }

        this.currentOverlay = new ol.Overlay({
            element: container,
            autoPan: autoPan,
            autoPanAnimation: { source: undefined, duration: 250 }
        });

        this.map.addOverlay(this.currentOverlay);
        this.currentOverlay.setPosition(coordinates.getMercator()); // force auto panning
    }


    public closeOverlay() {
        if (!this.currentOverlay) {
            return;
        }

        this.map.removeOverlay(this.currentOverlay);
        this.currentOverlay = undefined;

        this.mapOverlayClosedSource.next();
    }

    // endregion


    // region map events

    private onMoveEnd(event: ol.MapEvent) {
        this.mapMovedZoomedRotatedSource.next();
    }


    private onViewRotation(event: ol.ObjectEvent) {
        this.mapMovedZoomedRotatedSource.next();
    }


    private onSingleClick(event: ol.MapBrowserEvent) {
        const feature = this.getMapItemOlFeatureAtPixel(event.pixel, true);
        const clickPos = Position2d.createFromMercator(event.coordinate);

        if (feature) { // click on feature
            this.closeOverlay();
            this.closeSearchItemSelection();
            this.mapItemClickedSource.next([feature.getDataItem(), clickPos]);
        } else if (this.currentOverlay) { // close overlay
            this.closeOverlay();
            this.closeSearchItemSelection();
        } else if (this.isSearchItemSelectionActive) { // close search item selection
            this.closeSearchItemSelection();
        } else { // click on empty map
            this.mapClickedSource.next(clickPos);
        }
    }


    private onPointerMove(event: ol.MapBrowserEvent) {
        if (event.dragging) {
            return;
        }

        const feature = this.getMapItemOlFeatureAtPixel(event.pixel, true);

        if (feature) {
            const element = this.map.getTargetElement() as HTMLElement;
            element.style.cursor = 'pointer';
        } else {
            const element = this.map.getTargetElement() as HTMLElement;
            element.style.cursor = 'default';
        }
    }


    private onFlightrouteModifyEnd(event: ol.interaction.Modify.Event) {
        if (!event || !event.mapBrowserEvent)
            return;

        const lineFeature = event.features.getArray()[0];
        const newCoordinates = (lineFeature.getGeometry() as ol.geom.LineString).getCoordinates();

        // publish geometry modifications
        const wpMod = this.findWaypointModification(newCoordinates);
        this.mapFlightrouteModifiedSource.next(wpMod);
    }


    private findWaypointModification(newCoordinates: ol.Coordinate[]): WaypointModification {
        // find index of changed wp
        for (let i = 0; i < newCoordinates.length; i++) {
            if (i >= this.routeCoordinatesBeforeModify.length
                || this.routeCoordinatesBeforeModify[i][0] !== newCoordinates[i][0]
                || this.routeCoordinatesBeforeModify[i][1] !== newCoordinates[i][1])
            {
                return new WaypointModification(
                    i,
                    (this.routeCoordinatesBeforeModify.length !== newCoordinates.length),
                    Position2d.createFromMercator(newCoordinates[i])
                );
            }
        }

        return undefined;
    }


    private getMapItemOlFeatureAtPixel(pixel: ol.Pixel, onlyClickable: boolean): OlFeature {
        const features = this.map.getFeaturesAtPixel(pixel,
            { layerFilter: this.isClickableLayer.bind(this), hitTolerance: HIT_TOLERANCE_PIXELS });
        if (!features) {
            return undefined;
        }

        // TODO: sort by prio

        for (const feature of features) {
            if (feature instanceof OlFeature) {
                if (onlyClickable === false || this.isClickableFeature(feature)) {
                    return feature;
                }
            }
        }

        return undefined;
    }


    private isClickableLayer(layer: ol.layer.Layer): boolean {
        return (layer === this.routeItemsLayer ||
                layer === this.nonrouteItemsLayer ||
                layer === this.notamLayer ||
                layer === this.flightrouteLayer ||
                layer === this.searchItemLayer ||
                layer === this.trafficLayer);
    }


    private isClickableFeature(feature: OlFeature): boolean { // TODO => als property / interface
        return (feature instanceof OlAirport === true ||
                // feature instanceof OlAirportRunway === true ||
                feature instanceof OlNavaid === true ||
                feature instanceof OlReportingPoint === true ||
                feature instanceof OlReportingSector === true ||
                feature instanceof OlUserPoint === true ||
                feature instanceof OlWebcam === true ||
                feature instanceof OlMetarSky === true ||
                feature instanceof OlMetarWind === true ||
                feature instanceof OlNotam === true ||
                feature instanceof OlWaypoint === true ||
                feature instanceof OlSearchItem === true ||
                feature instanceof OlTraffic === true);
    }

    // endregion
}
