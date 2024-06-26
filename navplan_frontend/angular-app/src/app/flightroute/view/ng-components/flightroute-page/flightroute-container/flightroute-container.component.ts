import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {getFlightroute} from '../../../../state/ngrx/flightroute.selectors';
import {getCurrentUser} from '../../../../../user/state/ngrx/user.selectors';
import {Waypoint} from '../../../../domain/model/waypoint';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {FlightrouteListDialogComponent} from '../flightroute-list-dialog/flightroute-list-dialog.component';
import {EditWaypointDialogComponent} from '../edit-waypoint-dialog/edit-waypoint-dialog.component';
import {FlightrouteListActions} from '../../../../state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../state/ngrx/flightroute-crud.actions';
import {WaypointActions} from '../../../../state/ngrx/waypoints.actions';
import {FlightrouteActions} from '../../../../state/ngrx/flightroute.actions';
import {getSelectedSpeedUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-flightroute-container',
    templateUrl: './flightroute-container.component.html',
    styleUrls: ['./flightroute-container.component.scss']
})
export class FlightrouteContainerComponent implements OnInit {
    public flightrouteForm: FormGroup;

    protected readonly currentUser$ = this.appStore.pipe(select(getCurrentUser));
    protected readonly isUserLoggedIn$ = this.currentUser$.pipe(map(user => user != null));
    protected readonly currentFlightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly flightrouteName$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.title));
    protected readonly flightrouteId$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.id));
    protected readonly routeComments$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.comments));
    protected readonly aircraftSpeed$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.aircraft.speed));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSelectedSpeedUnit));


    constructor(
        private appStore: Store<any>,
        private dialog: MatDialog,
        private formBuilder: FormBuilder
    ) {
    }


    ngOnInit() {
        this.flightrouteForm = this.formBuilder.group({});

        this.appStore.dispatch(FlightrouteListActions.readList());
    }


    protected onFlightrouteNameChanged(name: string) {
        this.appStore.dispatch(FlightrouteActions.updateTitle({title: name}));
    }


    protected onAircraftSpeedChanged(speed: Speed) {
        this.appStore.dispatch(FlightrouteActions.updateAircraftSpeed({aircraftSpeed: speed}));
    }


    protected onLoadFlightrouteClick() {
        this.dialog.open(FlightrouteListDialogComponent);
    }


    protected onSaveFlightrouteClick() {
        this.appStore.dispatch(FlightrouteCrudActions.save());
    }


    protected onSaveFlightrouteCopyClick() {
        this.appStore.dispatch(FlightrouteCrudActions.saveDuplicate());
    }


    protected onEditWaypointClick(editWaypoint: Waypoint) {
        const dialogRef = this.dialog.open(EditWaypointDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: editWaypoint
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


    protected onRemoveWaypointClick(waypoint: Waypoint) {
        this.appStore.dispatch(WaypointActions.delete({
            waypoint: waypoint
        }));
    }


    protected onReverseWaypointsClick() {
        this.appStore.dispatch(WaypointActions.reverse());
    }


    protected onFlightrouteCommentsChanged(comments: string) {
        this.appStore.dispatch(FlightrouteActions.updateComments({comments: comments}));
    }
}
