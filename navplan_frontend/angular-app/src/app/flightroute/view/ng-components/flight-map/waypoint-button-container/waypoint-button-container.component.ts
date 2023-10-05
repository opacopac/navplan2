import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../../../state/ngrx/flightroute.selectors';
import {Flightroute} from '../../../../domain/model/flightroute';
import {Waypoint} from '../../../../domain/model/waypoint';
import {WaypointActions} from '../../../../state/ngrx/waypoints.actions';
import {getFlightMapShowOverlay} from '../../../../../flight-map/state/ngrx/flight-map.selectors';
import {EditWaypointDialogComponent} from '../../flightroute-page/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'app-waypoint-button-container',
    templateUrl: './waypoint-button-container.component.html',
    styleUrls: ['./waypoint-button-container.component.css']
})
export class WaypointButtonContainerComponent implements OnInit {
    public readonly flightroute$: Observable<Flightroute>;
    public readonly waypoint$: Observable<Waypoint>;
    public readonly isAddable$: Observable<boolean>;
    public readonly isWaypointInFlightroute$: Observable<boolean>;
    public readonly isAlternateWaypoint$: Observable<boolean>;
    public readonly isAlternateEligible$: Observable<boolean>;


    public constructor(
        private appStore: Store<any>,
        private dialog: MatDialog,
    ) {
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
        this.waypoint$ = this.appStore.pipe(
            select(getFlightMapShowOverlay),
            map(overlay => overlay.waypoint)
        );

        this.isAddable$ = combineLatest([
            this.flightroute$,
            this.waypoint$
        ]).pipe(
            map(([route, wp]) => !route.containsWaypoint(wp) || route.waypoints.length > 1)
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
        const dialogRef = this.dialog.open(EditWaypointDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: waypoint
        });

        dialogRef.afterClosed().subscribe((oldNewWp) => {
            if (oldNewWp) {
                this.appStore.dispatch(WaypointActions.update({
                    oldWp: oldNewWp[0],
                    newWp: oldNewWp[1]
                }));
            }
        });
    }


    public onEditUserpoint(waypoint: Waypoint) {
        /*this.appStore.dispatch(new BaseMapOverlayCloseAction());
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));*/
    }
}
