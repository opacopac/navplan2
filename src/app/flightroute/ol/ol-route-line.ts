import {Map} from 'ol';
import {Feature} from 'ol';
import {Vector} from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import {Modify, Snap} from 'ol/interaction';
import {LineString} from 'ol/geom';
import {Collection} from 'ol';
import {Stroke, Style} from 'ol/style';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {Flightroute} from '../domain/flightroute';
import {EventEmitter} from '@angular/core';
import {Position2d} from '../../geo-math/domain/geometry/position2d';
import {OlHelper} from '../../ol-map/use-case/ol-helper';
import {ModifyEvent} from 'ol/interaction/Modify';


export class RouteLineModification {
    constructor(
        public index: number,
        public isNewWp: boolean,
        public newPos: Position2d) {
    }
}


export class OlRouteLine extends OlComponentBase {
    public onRouteLineModifiedEnd: EventEmitter<RouteLineModification> = new EventEmitter<RouteLineModification>();
    private readonly lineFeature: Feature;
    private modifyInteraction: Modify;
    private snapInteractions: Snap[];


    public constructor(
        private readonly flightroute: Flightroute,
        private readonly map: Map,
        private readonly source: Vector,
        private readonly snapToLayers: VectorLayer[]) {

        super();

        this.lineFeature = new Feature();
        this.lineFeature.setStyle(this.getStyle());
        this.setLineGeometry(this.lineFeature, flightroute.waypoints.map(waypoint => waypoint.position));
        this.source.addFeature(this.lineFeature);

        this.addModifyInteraction();
        this.addSnapInteractions(snapToLayers);
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.lineFeature.getGeometry().un('modifystart', this.onModifyStart.bind(this));
        this.lineFeature.getGeometry().un('change', this.onModifyChange.bind(this));
        this.lineFeature.getGeometry().un('modifyend', this.onModifyEnd.bind(this));

        this.map.removeInteraction(this.modifyInteraction);
        this.removeSnapInteractions();
    }


    private addModifyInteraction() {
        this.modifyInteraction = new Modify({
            deleteCondition : function() { return false; }, // no delete condition
            features: new Collection([this.lineFeature])
        });
        this.map.addInteraction(this.modifyInteraction);

        // add listeners
        this.modifyInteraction.on('modifystart', (event) => {
            this.onModifyStart(event as ModifyEvent);
        });

        this.modifyInteraction.on('change', (event) => {
            this.onModifyChange(event as Event);
        });

        this.modifyInteraction.on('modifyend', (event) => {
            this.onModifyEnd(event as ModifyEvent);
        });
    }


    private addSnapInteractions(snapToLayers: VectorLayer[]) {
        this.snapInteractions = [];
        snapToLayers.forEach((layer) => {
            const snapInt = new Snap({
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


    private onModifyChange(event: Event) {
        // TODO: action
    }


    private findRouteLineModification(event: ModifyEvent): RouteLineModification {
        const featureGeometry = event.features.item(0).getGeometry() as LineString;
        const newCoordinates = featureGeometry.getCoordinates();

        // find index of changed wp
        for (let i = 0; i < newCoordinates.length; i++) {
            if (i >= this.flightroute.waypoints.length || !this.flightroute.waypoints[i].position.equals(OlHelper.getPosFromMercator(newCoordinates[i]), 4)) {
                return new RouteLineModification(
                    i,
                    (this.flightroute.waypoints.length !== newCoordinates.length),
                    OlHelper.getPosFromMercator(newCoordinates[i])
                );
            }
        }

        return undefined;
    }
}
