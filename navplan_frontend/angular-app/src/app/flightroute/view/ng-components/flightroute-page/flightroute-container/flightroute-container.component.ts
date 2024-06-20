import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {FlightrouteActions} from '../../../../state/ngrx/flightroute.actions';
import {getSelectedSpeedUnit} from '../../../../../geo-physics/state/ngrx/geo-physics.selectors';


@Component({
    selector: 'app-flightroute-container',
    templateUrl: './flightroute-container.component.html',
    styleUrls: ['./flightroute-container.component.scss']
})
export class FlightrouteContainerComponent implements OnInit {
    protected readonly currentUser$ = this.appStore.pipe(select(getCurrentUser));
    protected readonly isUserLoggedIn$ = this.currentUser$.pipe(map(user => user != null));
    protected readonly loadedFlightroute$ = this.appStore.pipe(select(getFlightroute));
    protected readonly flightrouteName$ = this.loadedFlightroute$.pipe(map(flightroute => flightroute.title));
    protected readonly flightrouteId$ = this.loadedFlightroute$.pipe(map(flightroute => flightroute.id));
    protected readonly routeComments$ = this.loadedFlightroute$.pipe(map(flightroute => flightroute.comments));
    protected readonly aircraftSpeed$ = this.loadedFlightroute$.pipe(map(flightroute => flightroute.aircraft.speed));
    protected readonly speedUnit$ = this.appStore.pipe(select(getSelectedSpeedUnit));
    public flightrouteForm: FormGroup;
    public Number = Number;
    public console = console;


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
    ) {
        this.initForm();
    }


    ngOnInit() {
        this.appStore.dispatch(FlightrouteListActions.readList());
    }


    public onFlightrouteNameChanged(name: string) {
        this.appStore.dispatch(FlightrouteActions.updateTitle({title: name}));
    }


    public onFlightrouteCommentsChanged(comments: string) {
        this.appStore.dispatch(FlightrouteActions.updateComments({comments: comments}));
    }


    public onAircraftSpeedChanged(speedValue: string) {
        const speed = new Speed(parseInt(speedValue, 10), SpeedUnit.KT); // TODO
        this.appStore.dispatch(FlightrouteActions.updateAircraftSpeed({aircraftSpeed: speed}));
    }


    public onLoadFlightrouteClick() {
        this.dialog.open(FlightrouteListDialogComponent);
    }


    public onSaveFlightrouteClick() {
        this.appStore.dispatch(FlightrouteCrudActions.save());
    }


    public onSaveFlightrouteCopyClick() {
        this.appStore.dispatch(FlightrouteCrudActions.saveDuplicate());
    }


    public onEditWaypointClick(editWaypoint: Waypoint) {
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


    public onRemoveWaypointClick(waypoint: Waypoint) {
        this.appStore.dispatch(WaypointActions.delete({
            waypoint: waypoint
        }));
    }


    public onReverseWaypointsClick() {
        this.appStore.dispatch(WaypointActions.reverse());
    }


    private initForm() {
        this.flightrouteForm = this.formBuilder.group({
            'loadedFlightrouteId': -1,
            'flightrouteName': ['', Validators.maxLength(50)],
            'aircraftSpeed': ['', [Validators.required, Validators.maxLength(3)]],
            'aircraftConsumption': ['', [Validators.required, Validators.maxLength(2)]],
            'flightrouteComments': ['', [Validators.maxLength(2048)]]
        });
    }
}
