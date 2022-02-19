import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {Observable, Subscription} from 'rxjs';
import {OlRouteLine, RouteLineModification} from './ol-route-line';
import {OlWaypoint} from './ol-waypoint';
import {OlAlternateLine} from './ol-alternate-line';
import {Waypoint} from '../../flightroute/domain-model/waypoint';
import {Store} from '@ngrx/store';
import {Angle} from '../../geo-physics/domain-model/quantities/angle';
import {WaypointActions} from '../../flightroute-state/ngrx/waypoints.actions';
import {OlVectorLayer} from '../../base-map-view/ol-model/ol-vector-layer';
import {OlMap} from '../../base-map-view/ol-model/ol-map';


export class OlFlightrouteContainer {
    private readonly flightrouteSubscription: Subscription;
    private routeLineModifiedSubscription: Subscription;
    private olRouteLine: OlRouteLine;


    constructor(
        private readonly flightrouteLayer: OlVectorLayer,
        flightroute$: Observable<Flightroute>,
        private olMap: OlMap,
        snapToLayers: OlVectorLayer[],
        private readonly store: Store<any>,
        mapRotation: Angle
    ) {
        this.flightrouteSubscription = flightroute$.subscribe(flightroute => {
            this.destroyFeatures();
            this.drawFeatures(flightroute, olMap, snapToLayers, mapRotation);
            // re-subscribe to route line events
            this.routeLineModifiedSubscription = this.olRouteLine.onRouteLineModifiedEnd
                .subscribe(routeLineMod => this.emitRouteLineModifiedAction(routeLineMod));
        });
    }


    public destroy() {
        this.flightrouteSubscription.unsubscribe();
        this.routeLineModifiedSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private drawFeatures(flightroute: Flightroute, olMap: OlMap, snapToLayers: OlVectorLayer[], mapRotation: Angle) {
        if (flightroute) {
            // route
            this.olRouteLine = new OlRouteLine(flightroute, olMap, this.flightrouteLayer, snapToLayers); // TODO

            // route to alternate
            OlAlternateLine.draw(flightroute, this.flightrouteLayer);

            // route waypoints
            flightroute.waypoints.forEach((wp, index) => {
                const nextWp = this.getNextWp(flightroute.waypoints, flightroute.alternate, index);
                OlWaypoint.draw(wp, nextWp, mapRotation, this.flightrouteLayer);
            });

            // alternate waypoint
            if (flightroute.alternate) {
                OlWaypoint.draw(flightroute.alternate, undefined, mapRotation, this.flightrouteLayer);
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
        this.olRouteLine?.destroy();
        this.olRouteLine = undefined;
        this.flightrouteLayer.clear();
    }


    private emitRouteLineModifiedAction(routeLineMod: RouteLineModification) {
        if (routeLineMod.isNewWp) {
            this.store.dispatch(WaypointActions.insertByPos({
                newPosition: routeLineMod.newPos,
                index: routeLineMod.index,
                zoom: this.olMap.map.getView().getZoom() // TODO
            }));
        } else {
            this.store.dispatch(WaypointActions.replaceByPos({
                newPosition: routeLineMod.newPos,
                index: routeLineMod.index,
                zoom: this.olMap.map.getView().getZoom() // TODO
            }));
        }
    }
}
