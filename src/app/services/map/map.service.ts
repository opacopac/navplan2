import * as ol from 'openlayers';
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
import Pixel = ol.Pixel;


const HIT_TOLERANCE_PIXELS = 10;


@Injectable()
export class MapService {
    private map: ol.Map;
    private session: Sessioncontext;
    private mapLayer: ol.layer.Tile;
    private mapFeaturesLayer: ol.layer.Vector;
    private notamLayer: ol.layer.Vector;
    private flightrouteLayer: ol.layer.Vector;
    private searchItemLayer: ol.layer.Vector;
    private trafficLayer: ol.layer.Vector;
    private locationLayer: ol.layer.Vector;
    private onMovedZoomedRotatedCallback: () => void;
    private onMapItemClickedCallback: (dataItem: DataItem, clickPos: Position2d) => void;
    private onMapClickedCallback: (position: Position2d) => void;
    private onMapOverlayClosedCallback: () => void;
    private onFlightrouteChangedCallback: () => void;
    private onFullScreenClickedCallback: () => void;
    private currentOverlay: ol.Overlay;
    private isSearchItemSelectionActive: boolean;


    constructor(private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }


    // region init

    public initMap(
        onMovedZoomedRotatedCallback: () => void,
        onMapItemClickedCallback: (dataItem: DataItem, clickPos: Position2d) => void,
        onMapClickedCallback: (position: Position2d) => void,
        onMapOverlayClosedCallback: () => void,
        onFlightrouteChangedCallback: () => void,
        onFullScreenClickedCallback: () => void
    ) {
        // map
        this.initLayers();
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
                this.mapFeaturesLayer,
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

        // callbacks
        this.onMovedZoomedRotatedCallback = onMovedZoomedRotatedCallback;
        this.onMapItemClickedCallback = onMapItemClickedCallback;
        this.onMapClickedCallback = onMapClickedCallback;
        this.onMapOverlayClosedCallback = onMapOverlayClosedCallback;
        this.onFlightrouteChangedCallback = onFlightrouteChangedCallback;
        this.onFullScreenClickedCallback = onFullScreenClickedCallback;
    }


    private initLayers() {
        this.mapLayer = MapbaselayerFactory.create(this.session.settings.baseMapType);
        this.mapFeaturesLayer = this.createEmptyVectorLayer(true);
        this.notamLayer = this.createEmptyVectorLayer();
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
        const coord2Pixel: Pixel = [coord1Pixel[0], coord1Pixel[1] - radiusPixel];
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


    public drawMapFeatures(mapFeatures: Mapfeatures) {
        const source = this.mapFeaturesLayer.getSource();
        source.clear();

        if (!mapFeatures) {
            return;
        }

        const mapFeaturesOlFeature = new OlMapfeatureList(mapFeatures);
        mapFeaturesOlFeature.draw(source);
    }


    public drawMetarTaf(metarTafList: MetarTafList) {
        const source = this.mapFeaturesLayer.getSource();

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
        const source = this.flightrouteLayer.getSource();
        source.clear();

        // TODO: remove interactions?
        /*for (var j = 0; j < modifySnapInteractions.length; j++)
            map.removeInteraction(modifySnapInteractions[j]);
        modifySnapInteractions = [];*/

        if (!flightroute) {
            return;
        }

        const olFeature = new OlFlightroute(flightroute);
        olFeature.draw(source, this.map.getView().getRotation());


        // TODO: add snap interactions
        /*addSnapInteraction(airportLayer);
        addSnapInteraction(navaidLayer);
        addSnapInteraction(reportingpointLayer);
        addSnapInteraction(userWpLayer);*/
    }


    /*private addModifyInteraction(trackFeature: ol.Feature) {
        const modInteraction = new ol.interaction.Modify({
            deleteCondition : function(event) { return false; }, // no delete condition
            features: new ol.Collection([trackFeature])
        });

        modInteraction.on('modifyend', onTrackModifyEnd);
        modifySnapInteractions.push(modInteraction);

        this.map.addInteraction(modInteraction);
    }


    private addSnapInteraction(layer: ol.layer.Vector) {
        const snapInteraction = new ol.interaction.Snap({
            source: layer.getSource(),
            edge: false
        });

        modifySnapInteractions.push(snapInteraction);

        this.map.addInteraction(snapInteraction);
    }*/


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

        if (this.onMapOverlayClosedCallback) {
            this.onMapOverlayClosedCallback();
        }
    }

    // endregion


    // region map events

    private onMoveEnd(event: ol.MapEvent) {
        // TODO

        if (this.onMovedZoomedRotatedCallback) {
            this.onMovedZoomedRotatedCallback();
        }
    }


    private onViewRotation(event: ol.ObjectEvent) {
        // TODO

        if (this.onMovedZoomedRotatedCallback) {
            this.onMovedZoomedRotatedCallback();
        }
    }


    private onSingleClick(event: ol.MapBrowserEvent) {
        const feature = this.getMapItemOlFeatureAtPixel(event.pixel, true);
        const clickPos = Position2d.createFromMercator(event.coordinate);

        if (feature && this.onMapItemClickedCallback) { // click on feature
            this.closeOverlay();
            this.closeSearchItemSelection();
            this.onMapItemClickedCallback(feature.getDataItem(), clickPos);
        } else if (this.currentOverlay) { // close overlay
            this.closeOverlay();
            this.closeSearchItemSelection();
        } else if (this.isSearchItemSelectionActive) { // close search item selection
            this.closeSearchItemSelection();
        } else if (this.onMapClickedCallback) { // click on empty map
            this.onMapClickedCallback(clickPos);
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
        return (layer === this.mapFeaturesLayer ||
                layer === this.notamLayer ||
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
                feature instanceof OlSearchItem === true ||
                feature instanceof OlTraffic === true);
    }

    // endregion
}
