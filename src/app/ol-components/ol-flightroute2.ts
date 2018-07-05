import * as ol from 'openlayers';
import {RxService} from '../core/services/utils/rx.service';
import {Flightroute2} from '../model/flightroute/flightroute2';
import {OlComponent} from './ol-component';
import {OlWaypoint2} from './ol-waypoint2';
import {Waypoint2} from '../model/flightroute/waypoint2';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {OlRouteLine} from './ol-route-line';
import {OlAlternateLine} from './ol-alternate-line';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import {MapContext} from '../core/services/map/map.service';


export class OlFlightroute2 extends OlComponent {
    private readonly routeLine: OlRouteLine;
    private readonly alternateLine: OlAlternateLine;
    private readonly waypointFeatureList: OlWaypoint2[];
    private readonly alternateFeature: OlWaypoint2;
    private waypointListSubscription: Subscription;


    public constructor(
        mapContext: MapContext,
        private readonly flightroute$: Observable<Flightroute2>,
        private readonly source: ol.source.Vector) {

        super(mapContext);

        // create line features (route & alternate)
        this.routeLine = new OlRouteLine(
            this.mapContext,
            this.flightroute$,
            this.source);
        this.alternateLine = new OlAlternateLine(
            this.mapContext,
            this.flightroute$.switchMap(route => route ? route.waypointList.alternate$ : RxService.getEternal<Waypoint2>()),
            this.flightroute$.switchMap(route => route ? route.waypointList.lastItem$ : RxService.getEternal<Waypoint2>()),
            this.source
        );

        // create waypoint features (route & alternate)
        this.waypointFeatureList = []; // start empty
        this.alternateFeature = new OlWaypoint2(
            this.mapContext,
            this.flightroute$.switchMap(route => route ? route.waypointList.alternate$ : RxService.getEternal<Waypoint2>()),
            this.source
        );

        // handle waypoint list changes
        this.waypointListSubscription = this.flightroute$
            .switchMap(route => route ? route.waypointList.items$ : RxService.getEternal<Waypoint2[]>([]))
            .subscribe((waypointList) => {
                this.updateWaypointList(waypointList);
            });
    }


    public destroy() {
        this.routeLine.destroy();
        this.alternateLine.destroy();
        this.waypointFeatureList.forEach((waypoint) => waypoint.destroy());
        this.alternateFeature.destroy();
        this.waypointListSubscription.unsubscribe();
    }


    private updateWaypointList(wpList: Waypoint2[]) {
        this.waypointFeatureList.forEach(waypoint => waypoint.destroy()); // clean up
        this.waypointFeatureList.splice(0, this.waypointFeatureList.length); // clear array

        wpList.forEach((waypoint) => {
            this.waypointFeatureList.push(
                new OlWaypoint2(this.mapContext, RxService.getEternal<Waypoint2>(waypoint), this.source)
            );
        });
    }
}
