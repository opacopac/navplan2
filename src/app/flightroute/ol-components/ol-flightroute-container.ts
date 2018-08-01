import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Flightroute} from '../model/flightroute';
import {getFlightroute} from '../flightroute.selectors';
import {Subscription} from 'rxjs';
import {OlRouteLine} from './ol-route-line';
import {OlWaypoint2} from './ol-waypoint2';
import {OlAlternateLine} from './ol-alternate-line';
import {Waypoint} from '../model/waypoint';
import {OlDummy} from '../../track/ol-components/ol-dummy';


export class OlFlightrouteContainer extends OlComponent {
    private readonly flightrouteSubscription: Subscription;
    private readonly flightrouteLayer: ol.layer.Vector;
    private olRoutepoints: OlWaypoint2[];
    private olAlternate: OlWaypoint2;
    private olRouteLine: OlRouteLine;
    private olAlternateLine: OlAlternateLine;
    private olDummy: OlDummy;


    constructor(mapContext: MapContext) {
        super();

        this.flightrouteLayer = mapContext.mapService.addVectorLayer(false, false);
        const flightroute$ = mapContext.appStore.select(getFlightroute);
        this.flightrouteSubscription = flightroute$.subscribe((flightroute) => {
            this.destroyFeatures();
            this.addFeatures(flightroute, mapContext, this.flightrouteLayer.getSource());
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.flightrouteSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(flightroute: Flightroute, mapContext: MapContext, source: ol.source.Vector) {
        if (flightroute) {
            const mapRotation = mapContext.mapService.getRotation();
            this.olRouteLine = new OlRouteLine(flightroute, mapContext.map, source);
            this.olAlternateLine = new OlAlternateLine(flightroute, source);
            this.olRoutepoints = [];
            flightroute.waypoints.forEach((wp, index) => {
                const nextWp = this.getNextWp(flightroute.waypoints, flightroute.alternate, index);
                const olWp = new OlWaypoint2(wp, nextWp, mapRotation, source);
                this.olRoutepoints.push(olWp);
            });

            if (flightroute.alternate) {
                this.olAlternate = new OlWaypoint2(flightroute.alternate, undefined, mapRotation, source);
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
