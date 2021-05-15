import VectorLayer from 'ol/layer/Vector';
import {Flightroute} from '../domain-model/flightroute';
import {Observable, Subscription} from 'rxjs';
import {OlRouteLine, RouteLineModification} from './ol-route-line';
import {OlWaypoint} from './ol-waypoint';
import {OlAlternateLine} from './ol-alternate-line';
import {Waypoint} from '../domain-model/waypoint';
import {RouteLineModifiedAction} from '../ngrx/flightroute.actions';
import {Store} from '@ngrx/store';
import {Angle} from '../../common/geo-math/domain-model/quantities/angle';


export class OlFlightrouteContainer {
    private readonly flightrouteSubscription: Subscription;
    private routeLineModifiedSubscription: Subscription;
    private olRouteLine: OlRouteLine;


    constructor(
        private readonly flightrouteLayer: VectorLayer,
        flightroute$: Observable<Flightroute>,
        snapToLayers: VectorLayer[],
        private readonly store: Store<any>,
        mapRotation: Angle
    ) {
        this.flightrouteSubscription = flightroute$.subscribe(flightroute => {
            this.destroyFeatures();
            this.addFeatures(flightroute, snapToLayers, mapRotation);
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


    private addFeatures(flightroute: Flightroute, snapToLayers: VectorLayer[], mapRotation: Angle) {
        if (flightroute) {
            this.olRouteLine = new OlRouteLine(flightroute, null, this.flightrouteLayer, snapToLayers); // TODO
            const olAlternateLine = new OlAlternateLine(flightroute, this.flightrouteLayer);
            flightroute.waypoints.forEach((wp, index) => {
                const nextWp = this.getNextWp(flightroute.waypoints, flightroute.alternate, index);
                const olWp = new OlWaypoint(wp, nextWp, mapRotation, this.flightrouteLayer);
            });

            if (flightroute.alternate) {
                const olAlternate = new OlWaypoint(flightroute.alternate, undefined, mapRotation, this.flightrouteLayer);
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
        this.flightrouteLayer.getSource().clear(true);
    }


    private emitRouteLineModifiedAction(routeLineMod: RouteLineModification) {
        this.store.dispatch(new RouteLineModifiedAction(
            routeLineMod.index,
            routeLineMod.isNewWp,
            routeLineMod.newPos
        ));
    }
}
