import 'rxjs/add/operator/first';
import 'rxjs/add/operator/distinctUntilChanged';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session/session.service';
import {MessageService} from '../../services/utils/message.service';
import {Sessioncontext} from '../../model/sessioncontext';
import {UserService} from '../../services/user/user.service';
import {FlightrouteService} from '../../services/flightroute/flightroute.service';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsumptionUnit, SpeedUnit} from '../../services/utils/unitconversion.service';
import {Speed} from '../../model/units/speed';
import {Consumption} from '../../model/units/consumption';
import {Observable} from 'rxjs/Observable';
import {Flightroute2} from '../../model/flightroute-model/flightroute2';


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

        // fill initial values from current flightroute
        this.updateFormValues(this.session.flightroute$);

        // read latest flightroutes from user
        this.updateFlightrouteList();
    }


    ngOnDestroy() {
    }


    // endregion


    onLoadFlightrouteClicked(flightRouteId: string) {
        const flightRouteIdValue = Number(flightRouteId);
        if (flightRouteIdValue && flightRouteIdValue > 0) {
            const flightroute$ = this.flightrouteService.readFlightroute(flightRouteIdValue);
            flightroute$
                .first()
                .subscribe((route) => {
                    this.session.flightroute = route;
                });
            this.updateFormValues(flightroute$);
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
                .flatMap(route => route.aircraft$)
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
                .flatMap(route => route.aircraft$)
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


    private updateFlightrouteList() {
        if (this.sessionService.isLoggedIn()) {
            this.flightrouteService.readFlightrouteList()
                .first()
                .subscribe((flightrouteList) => {
                    this.session.flightrouteList = flightrouteList;
                });
        }
    }


    private updateFormValues(flightroute$: Observable<Flightroute2>) {
        flightroute$
            .withLatestFrom(
                flightroute$.flatMap(route => route.id$),
                flightroute$.flatMap(route => route.title$),
                flightroute$.flatMap(route => route.aircraft$).flatMap(aircraft => aircraft.speed$),
                flightroute$.flatMap(route => route.aircraft$).flatMap(aircraft => aircraft.consumption$),
                flightroute$.flatMap(route => route.comments$))
            .first()
            .subscribe(([flightroute, id, title, speed, consumption, comments]) => {
                this.setFormValues(id, title, speed, consumption, comments);
            });
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
