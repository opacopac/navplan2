import * as ol from 'openlayers';
import 'rxjs/add/observable/fromEventPattern';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Injectable} from '@angular/core';
import {MapbaselayerFactory, MapbaselayerType} from '../model/mapbaselayer-factory';
import {Extent} from '../../shared/model/extent';
import {Position2d} from '../../shared/model/geometry/position2d';
import {Mapfeatures} from '../../map-features/model/mapfeatures';
import {MetarTafList} from '../../metar-taf/model/metar-taf';
import {Traffic} from '../../traffic/model/traffic';
import {NotamList} from '../../notam/model/notam';
import {OlWebcam} from '../../map-features/ol-components/ol-webcam';
import {OlNavaid} from '../../map-features/ol-components/ol-navaid';
import {OlFeature} from '../../shared/model/ol-feature';
import {OlAirport} from '../../map-features/ol-components/ol-airport';
import {OlReportingPoint} from '../../map-features/ol-components/ol-reporting-point';
import {OlReportingSector} from '../../map-features/ol-components/ol-reporting-sector';
import {OlUserPoint} from '../../map-features/ol-components/ol-user-point';
import {OlMapfeatureList} from '../../map-features/ol-components/ol-mapfeature-list';
import {OlMetar} from '../../metar-taf/ol-components/ol-metar';
import {OlMetarWind} from '../../metar-taf/ol-components/ol-metar-wind';
import {OlMetarSky} from '../../metar-taf/ol-components/ol-metar-sky';
import {OlNotam} from '../../notam/ol-component/ol-notam';
import {DataItem} from '../../shared/model/data-item';
import {SearchItemList} from '../../search/model/search-item-list';
import {OlSearchItemSelection} from '../../search/ol-components/ol-searchitem-selection';
import {OlSearchItem} from '../../search/ol-components/ol-searchitem';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {OlFlightroute2} from '../../flightroute/ol-components/ol-flightroute2';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Angle} from '../../shared/model/quantities/angle';
import {OlWaypoint2} from '../../flightroute/ol-components/ol-waypoint2';
import {OlTraffic} from '../../traffic/ol-components/ol-traffic';
import {AngleUnit} from '../../shared/model/units';



export class MapContext {
    constructor(
        public map: ol.Map,
        public mapService: MapService) {
    }
}


const HIT_TOLERANCE_PIXELS = 10;


@Injectable()
export class MapService {
    public readonly mapPosition$: Observable<Position2d>;
    private readonly mapPositionSource: BehaviorSubject<Position2d>;
    public readonly mapZoom$: Observable<number>;
    private readonly mapZoomSource: BehaviorSubject<number>;
    public readonly mapExtent$: Observable<Extent>;
    private readonly mapExtentSource: BehaviorSubject<Extent>;
    public readonly mapRotation$: Observable<Angle>;
    private readonly mapRotationSource: BehaviorSubject<Angle>;
    public readonly mapItemClicked$: Observable<[DataItem, Position2d]>;
    private readonly mapItemClickedSource: Subject<[DataItem, Position2d]>;
    public readonly mapClicked$: Observable<Position2d>;
    private readonly mapClickedSource: Subject<Position2d>;
    public readonly mapOverlayClosed$: Observable<void>;
    private readonly mapOverlayClosedSource: Subject<void>;
    /*public readonly flightrouteModified$: Observable<WaypointModification>;
    private readonly mapFlightrouteModifiedSource: Subject<WaypointModification>;*/
    public readonly fullScreenClicked$: Observable<void>;
    private readonly mapFullScreenClickedSource: Subject<void>;

    private map: ol.Map;
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
    // private flightRouteFeature: OlFlightroute2;
    // private ownPlaneFeature: OlTraffic;


    constructor() {
        this.mapPositionSource = new BehaviorSubject<Position2d>(undefined);
        this.mapPosition$ = this.mapPositionSource.asObservable().distinctUntilChanged();
        this.mapZoomSource = new BehaviorSubject<number>(undefined);
        this.mapZoom$ = this.mapZoomSource.asObservable().distinctUntilChanged();
        this.mapExtentSource = new BehaviorSubject<Extent>(undefined);
        this.mapExtent$ = this.mapExtentSource.asObservable().distinctUntilChanged();
        this.mapRotationSource = new BehaviorSubject<Angle>(new Angle(0, AngleUnit.DEG));
        this.mapRotation$ = this.mapRotationSource.asObservable().distinctUntilChanged();
        this.mapItemClickedSource = new Subject<[DataItem, Position2d]>();
        this.mapItemClicked$ = this.mapItemClickedSource.asObservable();
        this.mapClickedSource = new Subject<Position2d>();
        this.mapClicked$ = this.mapClickedSource.asObservable();
        this.mapOverlayClosedSource = new Subject<void>();
        this.mapOverlayClosed$ = this.mapOverlayClosedSource.asObservable();
        // this.mapFlightrouteModifiedSource = new Subject<WaypointModification>();
        // this.flightrouteModified$ = this.mapFlightrouteModifiedSource.asObservable();
        this.mapFullScreenClickedSource = new Subject<void>();
        this.fullScreenClicked$ = this.mapFullScreenClickedSource.asObservable();
    }


    // region init

    public initMap(baseMapType: MapbaselayerType,
                   position: Position2d,
                   zoom: number,
                   mapRotation: Angle) {
        // map
        this.initLayers(baseMapType);
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
                center: position.getMercator(),
                zoom: zoom,
                rotation: mapRotation.rad,
            })
        });

        // set initial observable values
        this.mapPositionSource.next(position);
        this.mapZoomSource.next(zoom);
        this.mapRotationSource.next(mapRotation);

        // map events
        this.map.on('singleclick', this.onSingleClick.bind(this));
        this.map.on('pointermove', this.onPointerMove.bind(this));
        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.getView().on('change:rotation', this.onMapRotation.bind(this));

        // add features
        /*const mapContext = new MapContext(this.map, this, this.mapActionService);
        this.ownPlaneFeature = new OlTraffic(mapContext, ownPlane$, this.locationLayer.getSource());
        this.flightRouteFeature = new OlFlightroute2(mapContext, flightroute$, this.flightrouteLayer.getSource());*/

        // add snap interaction (must be added last, see: https://openlayers.org/en/latest/examples/snap.html)
        this.map.addInteraction(
            new ol.interaction.Snap({
                source: this.routeItemsLayer.getSource(),
                edge: false
            })
        );
    }


    public uninitMap() {
        // destroy features
        // this.ownPlaneFeature.destroy();
        // this.flightRouteFeature.destroy();

        // remove snap interactions
        this.map.getInteractions().forEach((interaction) => {
            this.map.removeInteraction(interaction);
        });

        this.map.un('singleclick', this.onSingleClick.bind(this));
        this.map.un('pointermove', this.onPointerMove.bind(this));
        this.map.un('moveend', this.onMoveEnd.bind(this));
        this.map.getView().un('change:rotation', this.onMapRotation.bind(this));
        this.map.setTarget(undefined);
        this.map = undefined;
    }


    private initLayers(baseMapType: MapbaselayerType) {
        this.mapLayer = MapbaselayerFactory.create(baseMapType);
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


    public setZoom(zoom: number) {
        const minZoom = (this.mapLayer.getSource() as ol.source.Tile).getTileGrid().getMinZoom();
        const maxZoom = (this.mapLayer.getSource() as ol.source.Tile).getTileGrid().getMaxZoom();
        if (zoom >= minZoom && zoom <= maxZoom) {
            return this.map.getView().setZoom(zoom);
        }
    }


    public zoomIn() {
        const zoom = this.map.getView().getZoom();
        this.setZoom(zoom + 1);
    }


    public zoomOut() {
        const zoom = this.map.getView().getZoom();
        this.setZoom(zoom - 1);
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


    // TODO: private
    public getZoom(): number {
        return this.map.getView().getZoom();
    }


    // TODO: private
    public getMapPosition(): Position2d {
        return Position2d.createFromMercator(this.map.getView().getCenter());
    }


    // TODO: private
    public getExtent(): Extent {
        return Extent.createFromMercator(this.map.getView().calculateExtent(this.map.getSize()));
    }


    private getRotation(): Angle {
        return new Angle(this.map.getView().getRotation(), AngleUnit.RAD);
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


    /*public drawLocation(ownPlane: Traffic) {
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
    }*/


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
        for (const interaction of this.interactions) {
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
        this.mapPositionSource.next(this.getMapPosition());
        this.mapZoomSource.next(this.getZoom());
        this.mapExtentSource.next(this.getExtent());
    }


    private onMapRotation(event: ol.ObjectEvent) {
        this.mapRotationSource.next(this.getRotation());
        this.mapExtentSource.next(this.getExtent());
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
        if (!event || !event.mapBrowserEvent) { return; }

        const lineFeature = event.features.getArray()[0];
        const newCoordinates = (lineFeature.getGeometry() as ol.geom.LineString).getCoordinates();

        // publish geometry modifications
        // const wpMod = this.findWaypointModification(newCoordinates);
        // this.mapFlightrouteModifiedSource.next(wpMod);
    }


    /*private findWaypointModification(newCoordinates: ol.Coordinate[]): WaypointModification {
        // find index of changed wp
        for (let i = 0; i < newCoordinates.length; i++) {
            if (i >= this.routeCoordinatesBeforeModify.length
                || this.routeCoordinatesBeforeModify[i][0] !== newCoordinates[i][0]
                || this.routeCoordinatesBeforeModify[i][1] !== newCoordinates[i][1]) {
                return new WaypointModification(
                    i,
                    (this.routeCoordinatesBeforeModify.length !== newCoordinates.length),
                    Position2d.createFromMercator(newCoordinates[i])
                );
            }
        }

        return undefined;
    }*/


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
                feature instanceof OlWaypoint2 === true ||
                feature instanceof OlSearchItem === true ||
                feature instanceof OlTraffic === true);
    }

    // endregion
}
