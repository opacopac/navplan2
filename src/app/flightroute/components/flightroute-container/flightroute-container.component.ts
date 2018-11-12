import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {getFlightroute, getFlightrouteList} from '../../flightroute.selectors';
import {getCurrentUser} from '../../../user/user.selectors';
import {FlightrouteListEntry} from '../../model/flightroute-list-entry';
import {Flightroute} from '../../model/flightroute';
import {User} from '../../../user/model/user';
import {
    FlightrouteCreateAction,
    FlightrouteDeleteAction,
    FlightrouteDuplicateAction,
    FlightrouteReadAction,
    FlightrouteReadListAction,
    UpdateAircraftSpeedAction,
    FlightrouteUpdateAction,
    UpdateFlightrouteCommentsAction,
    UpdateFlightrouteTitleAction
} from '../../flightroute.actions';
import {Waypoint} from '../../model/waypoint';
import {DeleteWaypointAction, EditWaypointAction, ReverseWaypointsAction} from '../../flightroute.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Speed} from '../../../shared/model/quantities/speed';
import {Consumption} from '../../../shared/model/quantities/consumption';
import {ConsumptionUnit, SpeedUnit} from '../../../shared/model/units';


@Component({
    selector: 'app-flightroute-container',
    templateUrl: './flightroute-container.component.html',
    styleUrls: ['./flightroute-container.component.css']
})
export class FlightrouteContainerComponent implements OnInit, OnDestroy {
    public currentUser$: Observable<User>;
    public flightrouteList$: Observable<FlightrouteListEntry[]>;
    public flightroute$: Observable<Flightroute>;
    public flightrouteId$: Observable<number>;
    public routeName$: Subject<string>;
    public routeComments$: Subject<string>;
    public aircraftSpeed$: Subject<number>;
    public flightrouteForm: FormGroup;
    public Number = Number;
    private flightrouteSubscription: Subscription;
    private routeNameSubscription: Subscription;
    private routeCommentsSubscription: Subscription;
    private aircraftSpeedSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder) {

        this.currentUser$ = this.appStore.pipe(select(getCurrentUser));
        this.flightrouteList$ = this.appStore.pipe(select(getFlightrouteList));
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
        this.flightrouteId$ = this.flightroute$.pipe(map(flightroute => flightroute.id));

        this.initForm();
    }


    ngOnInit() {
        this.appStore.dispatch(new FlightrouteReadListAction());

        this.initSubscriptions();
    }


    ngOnDestroy() {
        this.cancelSubscriptions();
    }


    public onLoadFlightrouteClick(flightRouteId: string) {
        this.appStore.dispatch(new FlightrouteReadAction(Number(flightRouteId)));
    }


    public onDeleteFlightrouteClick(flightRouteId: string) {
        this.appStore.dispatch(new FlightrouteDeleteAction(Number(flightRouteId)));
    }


    public onSaveFlightrouteClick() {
        if (this.getFlightrouteId() > 0) {
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
        this.appStore.dispatch(new FlightrouteDuplicateAction(this.getFlightrouteId()));
    }


    public onEditWaypointClick(waypoint: Waypoint) {
        this.appStore.dispatch(new EditWaypointAction(waypoint));
    }


    public onRemoveWaypointClick(waypoint: Waypoint) {
        this.appStore.dispatch(new DeleteWaypointAction(waypoint));
    }


    public onReverseWaypointsClick() {
        this.appStore.dispatch(new ReverseWaypointsAction());
    }


    private initForm() {
        this.flightrouteForm = this.formBuilder.group({
            'flightrouteId': -1,
            'flightrouteName': ['', Validators.maxLength(50)],
            'aircraftSpeed': ['', [Validators.required, Validators.maxLength(3)]],
            'aircraftConsumption': ['', [Validators.required, Validators.maxLength(2)]],
            'flightrouteComments': ['', [Validators.maxLength(2048)]]
        });
    }


    private setFormValues(id: number, title: string, speed: Speed, consumption: Consumption, comments: string) {
        this.flightrouteForm.setValue({
            'flightrouteId': id ? id : -1,
            'flightrouteName': title ? title : '',
            'aircraftSpeed': speed ? speed.getValue(SpeedUnit.KT) : '', // TODO
            'aircraftConsumption': consumption ? consumption.getValue(ConsumptionUnit.L_PER_H) : '', // TODO
            'flightrouteComments': comments ? comments : ''
        });
    }


    private getFlightrouteId(): number {
        const flightrouteId = this.flightrouteForm.controls['flightrouteId'].value;
        return Number(flightrouteId);
    }


    private initSubscriptions() {
        // handle flightroute changes
        this.flightrouteSubscription = this.flightroute$.subscribe((flightroute) => {
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
        this.flightrouteSubscription.unsubscribe();
        this.routeNameSubscription.unsubscribe();
        this.routeCommentsSubscription.unsubscribe();
        this.aircraftSpeedSubscription.unsubscribe();
    }
}
