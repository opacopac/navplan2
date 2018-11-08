import * as ol from 'openlayers';
import {OlComponentBase} from '../../base-map/ol-component/ol-component-base';
import {BaseMapContext} from '../../base-map/model/base-map-context';
import {Flightroute} from '../model/flightroute';
import {getFlightroute} from '../flightroute.selectors';
import {Subscription} from 'rxjs';
import {OlRouteLine} from './ol-route-line';
import {OlWaypoint} from './ol-waypoint';
import {OlAlternateLine} from './ol-alternate-line';
import {Waypoint} from '../model/waypoint';
import {select} from '@ngrx/store';


export class OlFlightrouteContainer extends OlComponentBase {
    private readonly flightrouteSubscription: Subscription;
    private readonly flightrouteLayer: ol.layer.Vector;
    private olRoutepoints: OlWaypoint[];
    private olAlternate: OlWaypoint;
    private olRouteLine: OlRouteLine;
    private olAlternateLine: OlAlternateLine;


    constructor(mapContext: BaseMapContext, snapToLayers: ol.layer.Vector[]) {
        super();

        this.flightrouteLayer = mapContext.mapService.addVectorLayer(false);
        const flightroute$ = mapContext.appStore.pipe(select(getFlightroute));
        this.flightrouteSubscription = flightroute$.subscribe((flightroute) => {
            this.destroyFeatures();
            this.addFeatures(flightroute, mapContext, this.flightrouteLayer.getSource(), snapToLayers);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.flightrouteSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(flightroute: Flightroute, mapContext: BaseMapContext, source: ol.source.Vector, snapToLayers: ol.layer.Vector[]) {
        if (flightroute) {
            const mapRotation = mapContext.mapService.getRotation();
            this.olRouteLine = new OlRouteLine(flightroute, mapContext.map, source, snapToLayers);
            this.olAlternateLine = new OlAlternateLine(flightroute, source, snapToLayers);
            this.olRoutepoints = [];
            flightroute.waypoints.forEach((wp, index) => {
                const nextWp = this.getNextWp(flightroute.waypoints, flightroute.alternate, index);
                const olWp = new OlWaypoint(wp, nextWp, mapRotation, source);
                this.olRoutepoints.push(olWp);
            });

            if (flightroute.alternate) {
                this.olAlternate = new OlWaypoint(flightroute.alternate, undefined, mapRotation, source);
            }
        }
    }


    private getNextWp(waypoints: Waypoint[], alternate: Waypoint, index: number): Waypoint {
        if (index < waypoints.length - 1) {
            return waypoints[index + 1];
        } else if (alternate) {
            return alternate;
        } else {
            return undefined;
        }
    }


    private destroyFeatures() {
        this.olRouteLine = undefined;
        this.olAlternateLine = undefined;
        this.olRoutepoints = [];
        this.olAlternate = undefined;
        this.flightrouteLayer.getSource().clear(true);
    }
}
