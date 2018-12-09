import * as ol from 'openlayers';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {Flightroute} from '../model/flightroute';
import {EventEmitter} from '@angular/core';
import {Position2d} from '../../shared/model/geometry/position2d';


export class RouteLineModification {
    constructor(
        public index: number,
        public isNewWp: boolean,
        public newPos: Position2d) {
    }
}


export class OlRouteLine extends OlComponentBase {
    public onRouteLineModifiedEnd: EventEmitter<RouteLineModification> = new EventEmitter<RouteLineModification>();
    private readonly lineFeature: ol.Feature;
    private modifyInteraction: ol.interaction.Modify;
    private snapInteractions: ol.interaction.Snap[];


    public constructor(
        private readonly flightroute: Flightroute,
        private readonly map: ol.Map,
        private readonly source: ol.source.Vector,
        private readonly snapToLayers: ol.layer.Vector[]) {

        super();

        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, flightroute.waypoints.map(waypoint => waypoint.position));
        this.source.addFeature(this.lineFeature);

        this.addModifyInteraction();
        this.addSnapInteractions(snapToLayers);
    }


    public get isSelectable(): boolean {
        return true;
    }


    public destroy() {
        this.lineFeature.getGeometry().un('modifystart', this.onModifyStart.bind(this));
        this.lineFeature.getGeometry().un('change', this.onModifyChange.bind(this));
        this.lineFeature.getGeometry().un('modifyend', this.onModifyEnd.bind(this));

        this.map.removeInteraction(this.modifyInteraction);
        this.removeSnapInteractions();
    }


    private addModifyInteraction() {
        this.modifyInteraction = new ol.interaction.Modify({
            deleteCondition : function() { return false; }, // no delete condition
            features: new ol.Collection([this.lineFeature])
        });
        this.map.addInteraction(this.modifyInteraction);

        // add listeners
        this.modifyInteraction.on('modifystart', (event) => {
            this.onModifyStart(event as ol.interaction.Modify.Event);
        });

        this.modifyInteraction.on('change', (event) => {
            this.onModifyChange(event as ol.interaction.Modify.Event);
        });

        this.modifyInteraction.on('modifyend', (event) => {
            this.onModifyEnd(event as ol.interaction.Modify.Event);
        });
    }


    private addSnapInteractions(snapToLayers: ol.layer.Vector[]) {
        this.snapInteractions = [];
        snapToLayers.forEach((layer) => {
            const snapInt = new ol.interaction.Snap({
                source: layer.getSource(),
                edge: false
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


    private getStyle(): ol.style.Style {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#FF00FF',
                width: 5
            })
        });
    }


    private onModifyStart(event: ol.interaction.Modify.Event) {
        // TODO: action
    }


    private onModifyEnd(event: ol.interaction.Modify.Event) {
        // TODO: action
        const wpMod = this.findRouteLineModification(event);
        if (wpMod) {
            this.onRouteLineModifiedEnd.emit(wpMod);
        }
    }


    private onModifyChange(event: ol.events.Event) {
        // TODO: action
    }


    private findRouteLineModification(event: ol.interaction.Modify.Event): RouteLineModification {
        const featureGeometry = event.features.item(0).getGeometry() as ol.geom.LineString;
        const newCoordinates = featureGeometry.getCoordinates();

        // find index of changed wp
        for (let i = 0; i < newCoordinates.length; i++) {
            if (i >= this.flightroute.waypoints.length || !this.flightroute.waypoints[i].position.equals(Position2d.createFromMercator(newCoordinates[i]), 4)) {
                return new RouteLineModification(
                    i,
                    (this.flightroute.waypoints.length !== newCoordinates.length),
                    Position2d.createFromMercator(newCoordinates[i])
                );
            }
        }

        return undefined;
    }
}
