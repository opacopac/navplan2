import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {WaypointActions} from '../../../../flightroute/state/ngrx/waypoints.actions';
import {getFlightMapShowOverlay} from '../../../state/ngrx/flight-map.selectors';
import {
    EditWaypointDialogComponent
} from '../../../../flightroute/view/ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {getSelectedAltitudeUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';


@Component({
    selector: 'app-map-popup-waypoint-button-container',
    templateUrl: './map-popup-waypoint-button-container.component.html',
    styleUrls: ['./map-popup-waypoint-button-container.component.scss']
})
export class MapPopupWaypointButtonContainerComponent implements OnInit {
    protected readonly flightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly waypoint$ = this.appStore.pipe(
        select(getFlightMapShowOverlay),
        map(overlay => overlay.waypoint)
    );
    protected readonly isAddable$ = combineLatest([
        this.flightroute$,
        this.waypoint$]
    ).pipe(
        map(([route, wp]) => !route.containsWaypoint(wp) || route.waypoints.length > 1)
    );
    protected readonly isWaypointInFlightroute$ = combineLatest([
        this.flightroute$,
        this.waypoint$]
    ).pipe(
        map(([route, wp]) => route.containsWaypoint(wp))
    );
    protected readonly isAlternateWaypoint$ = combineLatest([
        this.flightroute$,
        this.waypoint$]
    ).pipe(
        map(([route, wp]) => route.isAlternateWaypoint(wp))
    );
    protected readonly isAlternateEligible$ = combineLatest([
        this.flightroute$,
        this.waypoint$]
    ).pipe(
        map(([route, wp]) => route.isALternateEligible(wp))
    );
    protected readonly altitudeUnit$ = this.appStore.pipe(select(getSelectedAltitudeUnit));


    public constructor(
        private appStore: Store<any>,
        private dialog: MatDialog,
    ) {
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
            data: { editWaypoint: waypoint, altitudeUnit$: this.altitudeUnit$ }
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
