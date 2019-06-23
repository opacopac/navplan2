import {Vector} from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import {OlComponentBase} from '../../ol-map/ol/ol-component-base';
import {OlMapContext} from '../../ol-map/domain/ol-map-context';
import {Flightroute} from '../domain/flightroute';
import {getFlightroute} from '../ngrx/flightroute.selectors';
import {Subscription} from 'rxjs';
import {OlRouteLine, RouteLineModification} from './ol-route-line';
import {OlWaypoint} from './ol-waypoint';
import {OlAlternateLine} from './ol-alternate-line';
import {Waypoint} from '../domain/waypoint';
import {select} from '@ngrx/store';
import {RouteLineModifiedAction} from '../ngrx/flightroute.actions';


export class OlFlightrouteContainer extends OlComponentBase {
    private readonly flightrouteSubscription: Subscription;
    private routeLineModifiedSubscription: Subscription;
    private readonly flightrouteLayer: VectorLayer;
    private olRoutepoints: OlWaypoint[];
    private olAlternate: OlWaypoint;
    private olRouteLine: OlRouteLine;
    private olAlternateLine: OlAlternateLine;


    constructor(private mapContext: OlMapContext, snapToLayers: VectorLayer[]) {
        super();

        this.flightrouteLayer = this.mapContext.mapService.addVectorLayer(false);
        const flightroute$ = this.mapContext.appStore.pipe(select(getFlightroute));
        this.flightrouteSubscription = flightroute$.subscribe((flightroute) => {
            this.destroyFeatures();
            this.addFeatures(flightroute, this.mapContext, this.flightrouteLayer.getSource(), snapToLayers);
            // re-subscribe to route line events
            this.routeLineModifiedSubscription = this.olRouteLine.onRouteLineModifiedEnd
                .subscribe(routeLineMod => this.emitRouteLineModifiedAction(routeLineMod));
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.flightrouteSubscription.unsubscribe();
        this.routeLineModifiedSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(flightroute: Flightroute, mapContext: OlMapContext, source: Vector, snapToLayers: VectorLayer[]) {
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


    private emitRouteLineModifiedAction(routeLineMod: RouteLineModification) {
        this.mapContext.appStore.dispatch(new RouteLineModifiedAction(
            routeLineMod.index,
            routeLineMod.isNewWp,
            routeLineMod.newPos
        ));
    }
}
