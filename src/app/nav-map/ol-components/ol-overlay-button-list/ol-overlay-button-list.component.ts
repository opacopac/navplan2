import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseMapOverlayCloseAction} from '../../../base-map/base-map.actions';
import {DeleteWaypointAction, InsertWaypointAction, SetAlternateAction} from '../../../flightroute/flightroute.actions';
import {getFlightroute} from '../../../flightroute/flightroute.selectors';
import {Flightroute} from '../../../flightroute/model/flightroute';
import {Waypoint} from '../../../flightroute/model/waypoint';


@Component({
    selector: 'app-ol-overlay-button-list',
    templateUrl: './ol-overlay-button-list.component.html',
    styleUrls: ['./ol-overlay-button-list.component.css']
})
export class OlOverlayButtonListComponent implements OnInit {
    public readonly flightroute$: Observable<Flightroute>;
    public readonly isWaypointInFlightroute$: Observable<boolean>;
    public readonly isAlternateWaypoint$: Observable<boolean>;
    public readonly isAlternateEligible$: Observable<boolean>;
    @Input() waypoint: Waypoint;


    public constructor(
        private appStore: Store<any>) {
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
        this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new InsertWaypointAction(wpIdx[0], wpIdx[1]));
    }


    public onDeleteWaypoint(waypoint: Waypoint) {
        this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));
    }


    public onSetAlternate(waypoint: Waypoint) {
        this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new SetAlternateAction(waypoint));
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
