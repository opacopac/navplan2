import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../ngrx/flightroute.selectors';
import {Flightroute} from '../../domain-model/flightroute';
import {Waypoint} from '../../domain-model/waypoint';
import {WaypointActions} from '../../ngrx/waypoints.actions';
import {getFlightMapOverlay} from '../../../flight-map/ngrx/flight-map/flight-map.selectors';


@Component({
    selector: 'app-map-overlay-waypoint-container',
    templateUrl: './map-overlay-waypoint-container.component.html',
    styleUrls: ['./map-overlay-waypoint-container.component.css']
})
export class MapOverlayWaypointContainerComponent implements OnInit {
    public readonly flightroute$: Observable<Flightroute>;
    public readonly waypoint$: Observable<Waypoint>;
    public readonly isWaypointInFlightroute$: Observable<boolean>;
    public readonly isAlternateWaypoint$: Observable<boolean>;
    public readonly isAlternateEligible$: Observable<boolean>;


    public constructor(private appStore: Store<any>) {
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
        this.waypoint$ = this.appStore.pipe(
            select(getFlightMapOverlay),
            map(overlay => overlay.waypoint)
        );
        this.isWaypointInFlightroute$ = combineLatest([
            this.flightroute$,
            this.waypoint$
        ]).pipe(
            map(([route, wp]) => route.containsWaypoint(wp))
        );
        this.isAlternateWaypoint$ = combineLatest([
            this.flightroute$,
            this.waypoint$
        ]).pipe(
            map(([route, wp]) => route.isAlternateWaypoint(wp))
        );
        this.isAlternateEligible$ = combineLatest([
            this.flightroute$,
            this.waypoint$
        ]).pipe(
            map(([route, wp]) => route.isALternateEligible(wp))
        );
    }


    ngOnInit() {
    }


    public onInsertWaypointAt(wpIdx: [Waypoint, number]) {
        this.appStore.dispatch(WaypointActions.insert({
            newWaypoint: wpIdx[0],
            index: wpIdx[1]
        }));
    }


    public onDeleteWaypoint(waypoint: Waypoint) {
        this.appStore.dispatch(WaypointActions.delete({
            waypoint: waypoint
        }));
    }


    public onSetAlternate(waypoint: Waypoint) {
        this.appStore.dispatch(WaypointActions.setAlternate({
            alternate: waypoint
        }));
    }


    public onEditWaypoint(waypoint: Waypoint) {
        /*this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));*/
    }


    public onEditUserpoint(waypoint: Waypoint) {
        /*this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));*/
    }
}
