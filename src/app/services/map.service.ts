import { Injectable } from '@angular/core';
import * as ol from 'openlayers';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { MapbaselayerFactory } from '../model/map/mapbaselayer-factory';
import { Extent } from '../model/map/extent';
import { Position2d } from '../model/position';
import { Mapfeatures, MapfeaturesOlFeature } from '../model/map/mapfeatures';


@Injectable()
export class MapService {
    private map: ol.Map;
    private session: Sessioncontext;
    private mapLayer: ol.layer.Layer;
    private mapFeaturesLayer: ol.layer.Layer;
    private navaidLayer: ol.layer.Layer;
    private airportLayer: ol.layer.Layer;
    private airspaceLayer: ol.layer.Layer;
    private reportingPointLayer: ol.layer.Layer;
    private userPointLayer: ol.layer.Layer;
    private webcamLayer: ol.layer.Layer;
    private onMovedZoomedRotatedCallback: () => void;


    constructor(private sessionService: SessionService) {
        this.session = sessionService.getSessionContext();
    }


    // region init

    public initMap(onMovedZoomedRotatedCallback: () => void) {
        // map
        this.initLayers();
        this.map = new ol.Map({
            target: 'map',
            layers: [
                this.mapLayer,
                this.mapFeaturesLayer,
                this.airspaceLayer,
                this.navaidLayer,
                this.airportLayer,
                this.reportingPointLayer,
                this.userPointLayer,
                this.webcamLayer
            ],
            view: new ol.View({
                center: this.session.map.position.getMercator(),
                zoom: this.session.map.zoom
            })
        });

        this.map.on('moveend', this.onMoveEnd.bind(this));
        this.map.on('singleclick', this.onSingleClick.bind(this));
        this.map.on('pointermove', this.onPointerMove.bind(this));
        this.map.getView().on('change:rotation', this.onViewRotation.bind(this));

        // callbacks
        this.onMovedZoomedRotatedCallback = onMovedZoomedRotatedCallback;
    }


    private initLayers() {
        this.mapLayer = MapbaselayerFactory.create(this.session.settings.baseMapType);
        this.mapFeaturesLayer = this.createEmptyVectorLayer();
        this.navaidLayer = this.createEmptyVectorLayer();
        this.airportLayer = this.createEmptyVectorLayer();
        this.airspaceLayer = this.createEmptyVectorLayer();
        this.reportingPointLayer = this.createEmptyVectorLayer();
        this.userPointLayer = this.createEmptyVectorLayer();
        this.webcamLayer = this.createEmptyVectorLayer();
    }


    private createEmptyVectorLayer(): ol.layer.Vector {
        return new ol.layer.Vector({
            source: new ol.source.Vector({})
        });
    }


    // endregion


    // region map position / size

    public getMapPosition(): Position2d {
        return Position2d.createFromMercator(this.map.getView().getCenter());

        // TODO: zoom?
    }


    /*public setMapPosition(lat, lon, zoom, forceRender) {
        if (!map || !map.getView())
            return;

        if (lat && lon)
        {
            var pos = ol.proj.fromLonLat([lon, lat]);
            map.getView().setCenter(pos);
        }

        if (zoom)
            map.getView().setZoom(zoom);

        if (forceRender)
            map.renderSync();
    }*/


    public getExtent(): Extent {
        return Extent.createFromMercator(this.map.getView().calculateExtent(this.map.getSize()));
    }

    // endregion


    // region draw


    public drawMapFeatures(mapFeatures: Mapfeatures) {
        const source = this.mapFeaturesLayer.getSource() as ol.source.Vector;
        source.clear();

        const mapFeaturesOlFeature = new MapfeaturesOlFeature(mapFeatures);
        mapFeaturesOlFeature.draw(source);
    }


    // endregion


    // region map events

    private onMoveEnd(event) {
        // TODO

        if (this.onMovedZoomedRotatedCallback) {
            this.onMovedZoomedRotatedCallback();
        }
    }


    private onSingleClick(event) {
    }


    private onPointerMove(event) {
    }


    private onViewRotation(event) {
        // TODO

        if (this.onMovedZoomedRotatedCallback) {
            this.onMovedZoomedRotatedCallback();
        }
    }

    // endregion
}
