import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {getFlightroute, getUseAircraftSpeedValue} from '../../../../flightroute/state/ngrx/flightroute.selectors';
import {getCurrentUser} from '../../../../user/state/ngrx/user.selectors';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {RoutePickerListDialogComponent} from '../../../../flightroute/view/ng-components/route-picker-list-dialog/route-picker-list-dialog.component';
import {EditWaypointDialogComponent} from '../../../../flightroute/view/ng-components/edit-waypoint-dialog/edit-waypoint-dialog.component';
import {FlightrouteListActions} from '../../../../plan-route-list/state/ngrx/flightroute-list.actions';
import {FlightrouteCrudActions} from '../../../../flightroute/state/ngrx/flightroute-crud.actions';
import {WaypointActions} from '../../../../flightroute/state/ngrx/waypoints.actions';
import {FlightrouteActions} from '../../../../flightroute/state/ngrx/flightroute.actions';
import {getAltitudeUnit, getSpeedUnit} from '../../../../geo-physics/state/ngrx/geo-physics.selectors';
import {FormBuilder, FormGroup} from '@angular/forms';
import {getCurrentAircraft} from '../../../../aircraft/state/ngrx/aircraft.selectors';


@Component({
    selector: 'app-waypoints-container',
    templateUrl: './waypoints-container.component.html',
    styleUrls: ['./waypoints-container.component.scss']
})
export class WaypointsContainerComponent implements OnInit {
    public flightrouteForm: FormGroup;

    protected readonly currentUser$ = this.appStore.pipe(select(getCurrentUser));
    protected readonly isUserLoggedIn$ = this.currentUser$.pipe(map(user => user != null));
    protected readonly currentFlightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly flightrouteName$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.title));
    protected readonly routeComments$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.comments));
    protected readonly routeSpeed$ = this.currentFlightroute$.pipe(map(flightroute => flightroute.aircraftParams.speed));
    protected readonly selectedAircraft$ = this.appStore.pipe(select(getCurrentAircraft));
    protected readonly useAircraftSpeedValue$ = this.appStore.pipe(select(getUseAircraftSpeedValue));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSpeedUnit));
    protected readonly altitudeUnit$ = this.appStore.pipe(select(getAltitudeUnit));


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


    protected onRouteSpeedChanged(speed: Speed) {
        this.appStore.dispatch(FlightrouteActions.updateCruiseSpeed({cruiseSpeed: speed}));
    }


    protected onUseAircraftSpeedChanged(useAircraftSpeed: boolean) {
        this.appStore.dispatch(FlightrouteActions.updateUseAircraftSpeedValue({useAircraftSpeed: useAircraftSpeed}));
    }


    protected onFlightrouteNameChanged(name: string) {
        this.appStore.dispatch(FlightrouteActions.updateTitle({title: name}));
    }


    protected onLoadFlightrouteClick() {
        this.dialog.open(RoutePickerListDialogComponent);
    }


    protected onSaveFlightrouteClick() {
        this.appStore.dispatch(FlightrouteCrudActions.save());
    }


    protected onEditWaypointClick(editWaypoint: Waypoint) {
        const dialogRef = this.dialog.open(EditWaypointDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: {editWaypoint: editWaypoint, altitudeUnit$: this.altitudeUnit$}
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
