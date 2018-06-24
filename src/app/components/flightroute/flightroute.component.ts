import 'rxjs/add/operator/first';
import 'rxjs/add/operator/distinctUntilChanged';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {MessageService} from '../../services/utils/message.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {UserService} from '../../services/user/user.service';
import {FlightrouteService} from '../../services/flightroute/flightroute.service';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsumptionUnit, SpeedUnit} from '../../services/utils/unitconversion.service';
import {Speed} from '../../model/quantities/speed';
import {Consumption} from '../../model/quantities/consumption';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Flightroute2} from '../../model/flightroute/flightroute2';
import {Aircraft2} from '../../model/flightroute/aircraft2';


@Component({
    selector: 'app-flightroute',
    templateUrl: './flightroute.component.html',
    styleUrls: ['./flightroute.component.css']
})
export class FlightrouteComponent implements OnInit, OnDestroy {
    public flightrouteForm: FormGroup;
    public session: Sessioncontext;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    private flightrouteSubscription: Subscription;


    constructor(
        public formBuilder: FormBuilder,
        public userService: UserService,
        public flightrouteService: FlightrouteService,
        public sessionService: SessionService,
        private messageService: MessageService) {

        this.session = sessionService.getSessionContext();
    }


    // region component life cycle

    ngOnInit() {
        this.initForm();

        // subscribe to flightroute changes -> overwrite form values
        const aircraft$ = this.session.flightroute$
            .switchMap(route => route ? route.aircraft$ : Observable.of(undefined));
        this.flightrouteSubscription = this.session.flightroute$
            .filter(route => route !== undefined)
            .withLatestFrom(
                this.session.flightroute$.switchMap<Flightroute2, number>(route => route ? route.id$ : Observable.of(undefined)),
                this.session.flightroute$.switchMap<Flightroute2, string>(route => route ? route.title$ : Observable.of(undefined)),
                aircraft$.switchMap<Aircraft2, Speed>(aircraft => aircraft ? aircraft.speed$ : Observable.of(undefined)),
                aircraft$.switchMap<Aircraft2, Consumption>(aircraft => aircraft ? aircraft.consumption$ : Observable.of(undefined)),
                this.session.flightroute$.switchMap<Flightroute2, string>(route => route ? route.comments$ : Observable.of(undefined)))
            .subscribe(([flightroute, id, title, speed, consumption, comments]) => {
                this.setFormValues(id, title, speed, consumption, comments);
            });
    }


    ngOnDestroy() {
        this.flightrouteSubscription.unsubscribe();
    }


    // endregion


    onLoadFlightrouteClicked(flightRouteId: string) {
        const flightRouteIdValue = Number(flightRouteId);
        if (flightRouteIdValue && flightRouteIdValue > 0) {
            this.session.user$
                .first()
                .switchMap(user => this.flightrouteService.readFlightroute(flightRouteIdValue, user.email, user.token))
                    .subscribe((route) => {
                        this.session.flightroute = route;
                    });
        }
    }


    public onSaveFlightrouteClicked(flightRouteId: string) {
    }


    public onSaveFlightrouteCopyClicked() {
    }


    public onDeleteFlightrouteClicked(flightRouteId: string) {
    }


    public onUpdateRouteName(name: string) {
        if (name !== undefined) {
            this.session.flightroute$
                .first()
                .subscribe((route) => {
                    route.title = name;
                });
        }
    }


    public onUpdateRouteComments(comments: string) {
        if (comments !== undefined) {
            this.session.flightroute$
                .first()
                .subscribe((route) => {
                    route.comments = comments;
                });
        }
    }


    public onUpdateAircraftSpeed(speed: string) {
        const speedVal = Number(speed);
        if (speedVal && speedVal > 0) {
            this.session.flightroute$
                .switchMap(route => route.aircraft$)
                .first()
                .subscribe((aircraft) => {
                    aircraft.speed = new Speed(speedVal, SpeedUnit.KT);
                });
        }
    }


    public onUpdateAircraftConsumption(consumption: string) {
        const consumptionVal = Number(consumption);
        if (consumptionVal && consumptionVal > 0) {
            this.session.flightroute$
                .switchMap(route => route.aircraft$)
                .first()
                .subscribe((aircraft) => {
                    aircraft.consumption = new Consumption(consumptionVal, ConsumptionUnit.L_PER_H);
                });
        }
    }


    public onExportFlightroutePdfClicked(flightRouteId: string) {
    }


    public onExportFlightrouteExcelClicked(flightRouteId: string) {
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
            'flightrouteName': title,
            'aircraftSpeed': speed.getValue(SpeedUnit.KT),
            'aircraftConsumption': consumption.getValue(ConsumptionUnit.L_PER_H),
            'flightrouteComments': comments
        });
    }
}
