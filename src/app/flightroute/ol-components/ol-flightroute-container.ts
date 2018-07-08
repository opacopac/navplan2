import * as ol from 'openlayers';
import {OlComponent} from '../../shared/ol-component/ol-component';
import {MapContext} from '../../map/model/map-context';
import {Flightroute} from '../model/flightroute';
import {getFlightroute} from '../flightroute.selectors';
import {Subscription} from 'rxjs';
import {OlRouteLine} from './ol-route-line';
import {OlWaypoint2} from './ol-waypoint2';
import {OlAlternateLine} from './ol-alternate-line';


export class OlFlightrouteContainer extends OlComponent {
    private readonly flightrouteSubscription: Subscription;
    private olRoutepoints: OlWaypoint2[];
    private olAlternate: OlWaypoint2;
    private olRouteLine: OlRouteLine;
    private olAlternateLine: OlAlternateLine;


    constructor(mapContext: MapContext) {
        super();

        const source = mapContext.mapService.flightrouteLayer.getSource();
        const flightroute$ = mapContext.appStore.select(getFlightroute);
        this.flightrouteSubscription = flightroute$.subscribe((flightroute) => {
            this.addFeatures(flightroute, mapContext.map, source);
        });
    }


    public get isSelectable(): boolean {
        return false;
    }


    public destroy() {
        this.flightrouteSubscription.unsubscribe();
        this.destroyFeatures();
    }


    private addFeatures(flightroute: Flightroute, map: ol.Map, source: ol.source.Vector) {
        this.destroyFeatures();
        if (flightroute) {
            this.olRouteLine = new OlRouteLine(flightroute, map, source);
        }
    }


    private destroyFeatures() {
        if (this.olRouteLine) { this.olRouteLine.destroy(); }
    }
}
