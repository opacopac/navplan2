import {Collection, Map} from 'ol';
import {Modify, Snap} from 'ol/interaction';
import {LineString} from 'ol/geom';
import {Stroke, Style} from 'ol/style';
import {Flightroute} from '../domain-model/flightroute';
import {EventEmitter} from '@angular/core';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {ModifyEvent} from 'ol/interaction/Modify';
import {OlVectorLayer} from '../../base-map/ol-model/ol-vector-layer';
import {OlFeature} from '../../base-map/ol-model/ol-feature';
import {OlGeometry} from '../../base-map/ol-model/ol-geometry';


export class RouteLineModification {
    constructor(
        public index: number,
        public isNewWp: boolean,
        public newPos: Position2d
    ) {
    }
}


export class OlRouteLine {
    public onRouteLineModifiedEnd: EventEmitter<RouteLineModification> = new EventEmitter<RouteLineModification>();
    private readonly lineFeature: OlFeature;
    private modifyInteraction: Modify;
    private snapInteractions: Snap[];


    public constructor(
        private readonly flightroute: Flightroute,
        private readonly map: Map,
        layer: OlVectorLayer,
        snapToLayers: OlVectorLayer[]
    ) {
        this.lineFeature = new OlFeature(undefined, false);
        this.lineFeature.setStyle(this.getStyle());
        this.lineFeature.setGeometry(OlGeometry.fromLine(flightroute.waypoints.map(waypoint => waypoint.position)));
        layer.addFeature(this.lineFeature);

        this.addModifyInteraction();
        this.addSnapInteractions([...snapToLayers, layer]);
        // TODO: adding snap also to flightroute layer: https://github.com/openlayers/openlayers/issues/11976
    }


    public destroy() {
        /*this.lineFeature.feature.getGeometry().un('modifystart', this.onModifyStart.bind(this));
        this.lineFeature.feature.getGeometry().un('change', this.onModifyChange.bind(this));
        this.lineFeature.feature.getGeometry().un('modifyend', this.onModifyEnd.bind(this));*/

        this.map.removeInteraction(this.modifyInteraction);
        this.removeSnapInteractions();
    }


    private addModifyInteraction() {
        this.modifyInteraction = new Modify({
            deleteCondition: function () {
                return false;
            }, // no delete condition
            features: new Collection([this.lineFeature.feature])
        });
        this.map.addInteraction(this.modifyInteraction);

        // add listeners
        this.modifyInteraction.on('modifystart', (event) => {
            this.onModifyStart(event as ModifyEvent);
        });

        this.modifyInteraction.on('change', (event) => {
            this.onModifyChange(event as ModifyEvent);
        });

        this.modifyInteraction.on('modifyend', (event) => {
            this.onModifyEnd(event as ModifyEvent);
        });
    }


    private addSnapInteractions(snapToLayers: OlVectorLayer[]) {
        this.snapInteractions = [];
        snapToLayers.forEach((layer) => {
            const snapInt = new Snap({
                source: layer.vectorLayer.getSource(),
                vertex: true,
                edge: true,
            });
            this.snapInteractions.push(snapInt);
            this.map.addInteraction(snapInt);
        });
    }


    private removeSnapInteractions() {
        this.snapInteractions.forEach((interaction) => {
            this.map.removeInteraction(interaction);
        });
    }


    private getStyle(): Style {
        return new Style({
            stroke: new Stroke({
                color: '#FF00FF',
                width: 5
            })
        });
    }


    private onModifyStart(event: ModifyEvent) {
        // TODO: action
    }


    private onModifyEnd(event: ModifyEvent) {
        // TODO: action
        const wpMod = this.findRouteLineModification(event);
        if (wpMod) {
            this.onRouteLineModifiedEnd.emit(wpMod);
        }
    }


    private onModifyChange(event: ModifyEvent) {
        // TODO: action
    }


    private findRouteLineModification(event: ModifyEvent): RouteLineModification {
        const featureGeometry = event.features.item(0).getGeometry() as LineString;
        const newCoordinates = featureGeometry.getCoordinates();

        // find index of changed wp
        for (let i = 0; i < newCoordinates.length; i++) {
            if (
                i >= this.flightroute.waypoints.length
                || !this.flightroute.waypoints[i].position.equals(OlGeometry.getPosFromMercatorCoords(newCoordinates[i]), 4)
            ) {
                return new RouteLineModification(
                    i,
                    (this.flightroute.waypoints.length !== newCoordinates.length),
                    OlGeometry.getPosFromMercatorCoords(newCoordinates[i])
                );
            }
        }

        return undefined;
    }
}
