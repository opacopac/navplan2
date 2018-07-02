import 'rxjs/add/operator/first';
import 'rxjs/add/operator/distinctUntilChanged';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsumptionUnit, SpeedUnit} from '../../services/utils/unitconversion.service';
import {Speed} from '../../model/quantities/speed';
import {Consumption} from '../../model/quantities/consumption';
import {AppState} from '../../app.state';
import {Store} from '@ngrx/store';
import {
    CreateFlightrouteAction, DeleteFlightrouteAction, DuplicateFlightrouteAction,
    ReadFlightrouteAction,
    ReadFlightrouteListAction, UpdateAircraftConsumption, UpdateAircraftSpeed, UpdateExtraTime,
    UpdateFlightrouteAction, UpdateFlightrouteComments, UpdateFlightrouteTitle
} from '../../flightroute/flightroute.actions';
import {Observable, Subscription} from 'rxjs/Rx';
import {Flightroute} from '../../flightroute/model/flightroute';
import {getFlightroute, getFlightrouteList} from '../../flightroute/flightroute.selectors';
import {FlightrouteListEntry} from '../../model/flightroute/flightroute-list-entry';
import {User} from '../../user/model/user';
import {getCurrentUser} from '../../user/user.selectors';


@Component({
    selector: 'app-flightroute',
    templateUrl: './flightroute.component.html',
    styleUrls: ['./flightroute.component.css']
})
export class FlightrouteComponent implements OnInit, OnDestroy {
    public flightrouteForm: FormGroup;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    public currentUser$: Observable<User>;
    public flightrouteList$: Observable<FlightrouteListEntry[]>;
    public flightroute$: Observable<Flightroute>;
    private flightrouteSubscription: Subscription;


    constructor(
        private appStore: Store<AppState>,
        public formBuilder: FormBuilder) {

        this.currentUser$ = this.appStore.select(getCurrentUser);
        this.flightrouteList$ = this.appStore.select(getFlightrouteList);
        this.flightroute$ = this.appStore.select(getFlightroute);
    }


    ngOnInit() {
        this.flightrouteSubscription = this.flightroute$.subscribe(flightroute => {
            if (flightroute) {
                this.setFormValues(
                    flightroute.id,
                    flightroute.title,
                    flightroute.aircraft.speed,
                    flightroute.aircraft.consumption,
                    flightroute.comments);
            } else {
                this.initForm();
            }
        });


        this.appStore.dispatch(
            new ReadFlightrouteListAction()
        );
    }


    ngOnDestroy() {
        this.flightrouteSubscription.unsubscribe();
    }


    public onLoadFlightrouteClicked(flightRouteId: string) {
        this.appStore.dispatch(
            new ReadFlightrouteAction(Number(flightRouteId))
        );
    }


    public onSaveFlightrouteClicked(flightRouteId: string) {
        const flightRouteIdValue = Number(flightRouteId);
        if (flightRouteIdValue > 0) {
            this.appStore.dispatch(
                new UpdateFlightrouteAction()
            );
        } else {
            this.appStore.dispatch(
                new CreateFlightrouteAction()
            );
        }
    }


    public onSaveFlightrouteCopyClicked() {
        this.appStore.dispatch(
            new DuplicateFlightrouteAction()
        );
    }


    public onDeleteFlightrouteClicked(flightRouteId: string) {
        this.appStore.dispatch(
            new DeleteFlightrouteAction(Number(flightRouteId))
        );
    }


    public onUpdateRouteName(name: string) {
        this.appStore.dispatch(
            new UpdateFlightrouteTitle(name)
        );
    }


    public onUpdateRouteComments(comments: string) {
        this.appStore.dispatch(
            new UpdateFlightrouteComments(comments)
        );
    }


    public onUpdateAircraftSpeed(speed: string) {
        this.appStore.dispatch(
            new UpdateAircraftSpeed(Number(speed))
        );
    }


    public onUpdateAircraftConsumption(consumption: string) {
        this.appStore.dispatch(
            new UpdateAircraftConsumption(Number(consumption))
        );
    }


    public onUpdateExtraTime(extraTime: string) {
        this.appStore.dispatch(
            new UpdateExtraTime(Number(extraTime))
        );
    }


    public onExportFlightroutePdfClicked() {
    }


    public onExportFlightrouteExcelClicked() {
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
            'aircraftSpeed': speed.getValue(SpeedUnit.KT), // TODO
            'aircraftConsumption': consumption.getValue(ConsumptionUnit.L_PER_H), // TODO
            'flightrouteComments': comments
        });
    }
}
