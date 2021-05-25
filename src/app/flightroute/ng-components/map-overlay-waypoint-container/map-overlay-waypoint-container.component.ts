import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../ngrx/flightroute.selectors';
import {Flightroute} from '../../domain-model/flightroute';
import {Waypoint} from '../../domain-model/waypoint';
import {WaypointActions} from '../../ngrx/waypoints.actions';


@Component({
    selector: 'app-map-overlay-waypoint-container',
    templateUrl: './map-overlay-waypoint-container.component.html',
    styleUrls: ['./map-overlay-waypoint-container.component.css']
})
export class MapOverlayWaypointContainerComponent implements OnInit {
    public readonly flightroute$: Observable<Flightroute>;
    public readonly isWaypointInFlightroute$: Observable<boolean>;
    public readonly isAlternateWaypoint$: Observable<boolean>;
    public readonly isAlternateEligible$: Observable<boolean>;
    @Input() waypoint: Waypoint;


    public constructor(
        private appStore: Store<any>
    ) {
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
        this.isWaypointInFlightroute$ = this.flightroute$.pipe(
            map(route => route.containsWaypoint(this.waypoint))
        );
        this.isAlternateWaypoint$ = this.flightroute$.pipe(
            map(route => route.isAlternateWaypoint(this.waypoint))
        );
        this.isAlternateEligible$ = this.flightroute$.pipe(
            map(route => route.isALternateEligible(this.waypoint))
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
