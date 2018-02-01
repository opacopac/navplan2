import * as ol from 'openlayers';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { MapbaselayerFactory } from '../model/map/mapbaselayer-factory';
import { Extent } from '../model/map/extent';
import { Position2d } from '../model/position';
import { Mapfeatures } from '../model/map/mapfeatures';
import { Flightroute } from '../model/flightroute';
import { Traffic } from '../model/map/traffic';
import { OlFlightroute } from '../model/ol-model/ol-flightroute';
import { OlTraffic } from '../model/ol-model/ol-traffic';
import { OlWebcam } from '../model/ol-model/ol-webcam';
import { OlNavaid } from '../model/ol-model/ol-navaid';
import { OlFeature} from '../model/ol-model/ol-feature';
import { OlAirport } from '../model/ol-model/ol-airport';
import { OlReportingPoint } from '../model/ol-model/ol-reporting-point';
import { OlAirportRunway } from '../model/ol-model/ol-airport-runway';
import { OlReportingSector } from '../model/ol-model/ol-reporting-sector';
import { OlUserPoint } from '../model/ol-model/ol-user-point';
import { OlMapfeatureList } from '../model/ol-model/ol-mapfeature-list';


const HIT_TOLERANCE_PIXELS = 10;


@Injectable()
export class MapService {
    private map: ol.Map;
    private session: Sessioncontext;
    private mapLayer: ol.layer.Tile;
    private mapFeaturesLayer: ol.layer.Vector;
    private flightrouteLayer: ol.layer.Vector;
    private trafficLayer: ol.layer.Vector;
    private locationLayer: ol.layer.Vector;
    private onMovedZoomedRotatedCallback: () => void;
    private onMapItemClickedCallback: (olFeature: OlFeature) => void;
    private onMapClickedCallback: (position: Position2d) => void;
    private onFlightrouteChangedCallback: () => void;
    private onFullScreenClickedCallback: () => void;


    constructor(private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }


    // region init

    public initMap(
        onMovedZoomedRotatedCallback: () => void,
        onMapItemClickedCallback: (olFeature: OlFeature) => void,
        onMapClickedCallback: (position: Position2d) => void,
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
                this.flightrouteLayer,
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
        this.onFlightrouteChangedCallback = onFlightrouteChangedCallback;
        this.onFullScreenClickedCallback = onFullScreenClickedCallback;
    }


    private initLayers() {
        this.mapLayer = MapbaselayerFactory.create(this.session.settings.baseMapType);
        this.mapFeaturesLayer = this.createEmptyVectorLayer();
        this.flightrouteLayer = this.createEmptyVectorLayer();
        this.trafficLayer = this.createEmptyVectorLayer();
        this.locationLayer = this.createEmptyVectorLayer();
    }


    private createEmptyVectorLayer(): ol.layer.Vector {
        return new ol.layer.Vector({
            source: new ol.source.Vector({})
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


    /*public getClickRadiusDeg(position: Position2d): number {
        const clickPos = [event.pixel[0], event.pixel[1]];
        const coord1 = this.map.getCoordinateFromPixel(clickPos);
        const lat1 = ol.proj.toLonLat(coord1)[1];

        clickPos[1] -= 50;
        const coord2 = map.getCoordinateFromPixel(clickPos);
        const lat2 = ol.proj.toLonLat(coord2)[1];

        return Math.abs(lat2 - lat1);
    }*/


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


    public drawLocation(ownPlane: Traffic) {
        const source = this.locationLayer.getSource();
        source.clear();

        if (!ownPlane) {
            return;
        }

        // const ownPlaneOlFeature = new TrafficOlFeature(ownPlane);
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
            // const trafficOlFeature = new TrafficOlFeature(traffic);
            const trafficOlFeature = new OlTraffic(traffic);
            trafficOlFeature.draw(source);
        }
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

        if (feature && this.onMapItemClickedCallback) { // click on feature
            this.onMapItemClickedCallback(feature);
        } else if (false) { // close overlay / geopointselection
            // TODO
        } else if (this.onMapClickedCallback) { // click on empty map
            const position = Position2d.createFromMercator(event.coordinate);
            this.onMapClickedCallback(position);
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
        return (layer === this.mapFeaturesLayer);
    }


    private isClickableFeature(feature: OlFeature): boolean { // TODO => als property / interface
        return (feature instanceof OlAirport === true ||
                feature instanceof OlAirportRunway === true ||
                feature instanceof OlNavaid === true ||
                feature instanceof OlReportingPoint === true ||
                feature instanceof OlReportingSector === true ||
                feature instanceof OlUserPoint === true ||
                feature instanceof OlWebcam === true);
    }

    // endregion
}
