import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {Flightroute} from '../model/flightroute';
import {EventEmitter} from '@angular/core';


export class OlRouteLine extends OlComponent {
    public onModifyStart2: EventEmitter<ol.interaction.Modify.Event> = new EventEmitter<ol.interaction.Modify.Event>();
    public onModifyEnd2: EventEmitter<ol.interaction.Modify.Event> = new EventEmitter<ol.interaction.Modify.Event>();
    public onModifyChange2: EventEmitter<ol.events.Event> = new EventEmitter<ol.events.Event>();
    private readonly lineFeature: ol.Feature;
    private modifyInteraction: ol.interaction.Modify;


    public constructor(
        private readonly flightroute: Flightroute,
        private readonly map: ol.Map,
        private readonly source: ol.source.Vector) {

        super();

        this.lineFeature = new ol.Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, flightroute.waypoints.map(waypoint => waypoint.position));
        this.source.addFeature(this.lineFeature);

        this.addModifyInteraction();
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.lineFeature.getGeometry().un('modifystart', this.onModifyStart.bind(this));
        this.lineFeature.getGeometry().un('change', this.onModifyChange.bind(this));
        this.lineFeature.getGeometry().un('modifyend', this.onModifyEnd.bind(this));

        this.map.removeInteraction(this.modifyInteraction);

        this.removeFeature(this.lineFeature, this.source);
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
    }


    private onModifyChange(event: ol.events.Event) {
        // TODO: action
    }


    /*private findWaypointModification(featureGeometry: ol.geom.LineString, oldPosList: Position2d[]): WaypointModification {
        // find index of changed wp
        const newCoordinates = featureGeometry.getCoordinates();

        for (let i = 0; i < newCoordinates.length; i++) {
            if (i >= oldPosList.length || !oldPosList[i].equals(Position2d.createFromMercator(newCoordinates[i]), 4)) {
                return new WaypointModification(
                    i,
                    (oldPosList.length !== newCoordinates.length),
                    Position2d.createFromMercator(newCoordinates[i])
                );
            }
        }

        return undefined;
    }*/
}
