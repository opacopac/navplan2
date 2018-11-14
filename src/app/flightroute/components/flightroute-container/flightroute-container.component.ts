import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {getFlightroute} from '../../flightroute.selectors';
import {getCurrentUser} from '../../../user/user.selectors';
import {Flightroute} from '../../model/flightroute';
import {User} from '../../../user/model/user';
import {
    FlightrouteCreateAction,
    FlightrouteDuplicateAction,
    FlightrouteReadListAction,
    UpdateAircraftSpeedAction,
    FlightrouteUpdateAction,
    UpdateFlightrouteCommentsAction,
    UpdateFlightrouteTitleAction, SaveEditWaypointAction, CancelEditWaypointAction,
} from '../../flightroute.actions';
import {Waypoint} from '../../model/waypoint';
import {DeleteWaypointAction, EditWaypointAction, ReverseWaypointsAction} from '../../flightroute.actions';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Speed} from '../../../shared/model/quantities/speed';
import {Consumption} from '../../../shared/model/quantities/consumption';
import {ConsumptionUnit, SpeedUnit} from '../../../shared/model/units';
import {FlightrouteListDialogComponent} from '../flightroute-list-dialog/flightroute-list-dialog.component';
import {MatDialog} from '@angular/material';
import {EditWaypointFormComponent} from '../edit-waypoint-form/edit-waypoint-form.component';
import {EditWaypointDialogComponent} from '../edit-waypoint-dialog/edit-waypoint-dialog.component';


@Component({
    selector: 'app-flightroute-container',
    templateUrl: './flightroute-container.component.html',
    styleUrls: ['./flightroute-container.component.css']
})
export class FlightrouteContainerComponent implements OnInit, OnDestroy {
    public currentUser$: Observable<User>;
    public loadedFlightroute$: Observable<Flightroute>;
    public loadedFlightrouteId$: Observable<number>;
    public routeName$: Subject<string>;
    public routeComments$: Subject<string>;
    public aircraftSpeed$: Subject<number>;
    public flightrouteForm: FormGroup;
    public Number = Number;
    public console = console;
    private loadedFlightrouteSubscription: Subscription;
    private routeNameSubscription: Subscription;
    private routeCommentsSubscription: Subscription;
    private aircraftSpeedSubscription: Subscription;


    get loadedFlightrouteIdControl(): AbstractControl {
        return this.flightrouteForm.controls['loadedFlightrouteId'];
    }


    get loadedFlightrouteId(): number {
        return Number(this.loadedFlightrouteIdControl.value.id);
    }


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder,
        private dialog: MatDialog) {

        this.initForm();
        this.initObservables();
    }


    ngOnInit() {
        this.appStore.dispatch(new FlightrouteReadListAction());

        this.initSubscriptions();
    }


    ngOnDestroy() {
        this.cancelSubscriptions();
    }


    public onLoadFlightrouteClick() {
        this.dialog.open(FlightrouteListDialogComponent);
    }


    public onSaveFlightrouteClick() {
        if (this.loadedFlightrouteId > 0) {
            this.appStore.dispatch(
                new FlightrouteUpdateAction()
            );
        } else {
            this.appStore.dispatch(
                new FlightrouteCreateAction()
            );
        }
    }


    public onSaveFlightrouteCopyClick() {
        this.appStore.dispatch(new FlightrouteDuplicateAction(this.loadedFlightrouteId));
    }


    public onEditWaypointClick(editWaypoint: Waypoint) {
        //this.appStore.dispatch(new EditWaypointAction(waypoint)); TODO: remove action

        const dialogRef = this.dialog.open(EditWaypointDialogComponent, {
            // height: '800px',
            // width: '600px',
            data: editWaypoint
        });

        dialogRef.afterClosed().subscribe((result: Waypoint) => {
            if (result) {
                this.appStore.dispatch(
                    new SaveEditWaypointAction(result)
                );
            } else {
                this.appStore.dispatch(
                    new CancelEditWaypointAction()
                );
            }
        });
    }


    public onRemoveWaypointClick(waypoint: Waypoint) {
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));
    }


    public onReverseWaypointsClick() {
        this.appStore.dispatch(new ReverseWaypointsAction());
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


    private setFormValues(loadedFlightrouteId: number, title: string, speed: Speed, consumption: Consumption, comments: string) {
        this.flightrouteForm.setValue({
            'loadedFlightrouteId': loadedFlightrouteId ? loadedFlightrouteId : -1,
            'flightrouteName': title ? title : '',
            'aircraftSpeed': speed ? speed.getValue(SpeedUnit.KT) : '', // TODO
            'aircraftConsumption': consumption ? consumption.getValue(ConsumptionUnit.L_PER_H) : '', // TODO
            'flightrouteComments': comments ? comments : ''
        });
    }


    private initObservables() {
        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
        this.loadedFlightroute$ = this.appStore.pipe(select(getFlightroute));
        this.loadedFlightrouteId$ = this.loadedFlightroute$.pipe(map(flightroute => flightroute.id));
    }


    private initSubscriptions() {
        // handle flightroute changes (after loading/saving)
        this.loadedFlightrouteSubscription = this.loadedFlightroute$.subscribe((flightroute) => {
            if (flightroute) {
                this.setFormValues(
                    flightroute.id,
                    flightroute.title,
                    flightroute.aircraft.speed,
                    flightroute.aircraft.consumption,
                    flightroute.comments);
            } else {
                this.setFormValues(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined);
            }
        });

        // handle route name inputs
        this.routeName$ = new Subject<string>();
        this.routeNameSubscription = this.routeName$
            .pipe(debounceTime(500))
            .subscribe(name => this.appStore.dispatch(new UpdateFlightrouteTitleAction(name)));

        // handle route comment inputs
        this.routeComments$ = new Subject<string>();
        this.routeCommentsSubscription = this.routeComments$
            .pipe(debounceTime(500))
            .subscribe(comments => this.appStore.dispatch(new UpdateFlightrouteCommentsAction(comments)));

        // handle aircraft speed inputs
        this.aircraftSpeed$ = new Subject<number>();
        this.aircraftSpeedSubscription = this.aircraftSpeed$
            .pipe(debounceTime(500))
            .subscribe(speed => this.appStore.dispatch(new UpdateAircraftSpeedAction(speed)));
    }


    private cancelSubscriptions() {
        this.loadedFlightrouteSubscription.unsubscribe();
        this.routeNameSubscription.unsubscribe();
        this.routeCommentsSubscription.unsubscribe();
        this.aircraftSpeedSubscription.unsubscribe();
    }
}
