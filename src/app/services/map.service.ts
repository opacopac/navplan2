import { Injectable } from '@angular/core';
import * as ol from 'openlayers';
import { SessionService } from './session.service';
import { Sessioncontext } from '../model/sessioncontext';
import { MapbaselayerFactory } from '../model/map/mapbaselayer-factory';
import { Extent } from '../model/map/extent';
import { Position2d } from '../model/position';
import { Mapfeatures } from '../model/map/mapfeatures';
import { Navaid, NavaidOlFeatureFactory } from '../model/map/navaid';
import { Airport, AirportOlFeatureFactory } from '../model/map/airport';
import { RunwayOlFeatureFactory } from '../model/map/airport-runway';
import { AirportFeatureOlFeatureFactory } from '../model/map/airport-feature';


@Injectable()
export class MapService {
    private map: ol.Map;
    private session: Sessioncontext;
    private mapLayer: ol.layer.Layer;
    private navaidLayer: ol.layer.Layer;
    private airportLayer: ol.layer.Layer;
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
                this.navaidLayer,
                this.airportLayer
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
        this.navaidLayer = this.createEmptyVectorLayer();
        this.airportLayer = this.createEmptyVectorLayer();
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
        this.drawNavaidFeatures(mapFeatures.navaids);
        this.drawAirportFeatures(mapFeatures.airports);
    }


    private drawNavaidFeatures(navaids: Navaid[]) {
        const source = this.navaidLayer.getSource() as ol.source.Vector;
        source.clear();

        for (const navaid of navaids) {
            const feature = NavaidOlFeatureFactory.createOlFeature(navaid);
            if (feature) {
                source.addFeature(feature);
            }
        }
    }


    private drawAirportFeatures(airports: Airport[]) {
        const source = this.airportLayer.getSource() as ol.source.Vector;
        source.clear();

        for (const airport of airports) {
            const feature = AirportOlFeatureFactory.createOlFeature(airport);
            if (feature) {
                source.addFeature(feature);
            }

            // rwy icon
            if (airport.hasRunways() && !airport.isClosed() && !airport.isHeliport()) {
                const rwyFeature = RunwayOlFeatureFactory.createOlFeature(airport.runways[0], airport.position, airport.isMilitary());

                if (rwyFeature) {
                    source.addFeature(rwyFeature);
                }
            }

            // parachute icon
            if (airport.hasFeatures()) {
                const parachuteFeature = AirportFeatureOlFeatureFactory.createOlFeature(airport.features[0], airport.position);

                if (parachuteFeature) {
                    source.addFeature(parachuteFeature);
                }
            }
        }
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
