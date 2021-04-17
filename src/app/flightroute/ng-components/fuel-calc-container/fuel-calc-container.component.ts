import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Flightroute} from '../../domain-model/flightroute';
import {getFlightroute} from '../../ngrx/flightroute.selectors';
import {UpdateAircraftConsumptionAction, UpdateExtraTimeAction} from '../../ngrx/flightroute.actions';
import {RouteFuel} from '../../domain-model/routefuel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumption} from '../../../geo-math/domain-model/quantities/consumption';
import {ConsumptionUnit, TimeUnit} from '../../../geo-math/domain-model/quantities/units';
import {Time} from '../../../geo-math/domain-model/quantities/time';

@Component({
    selector: 'app-fuel-calc-container',
    templateUrl: './fuel-calc-container.component.html',
    styleUrls: ['./fuel-calc-container.component.css']
})
export class FuelCalcContainerComponent implements OnInit, OnDestroy {
    public flightroute$: Observable<Flightroute>;
    public routeFuel$: Observable<RouteFuel>;
    public aircraftConsumption$: Subject<number>;
    public extraTime$: Subject<number>;
    public fuelForm: FormGroup;
    public Number = Number;
    private flightrouteSubscription: Subscription;
    private aircraftConsumptionSubscription: Subscription;
    private extraTimeSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        private formBuilder: FormBuilder) {
        this.flightroute$ = this.appStore.pipe(select(getFlightroute));
        this.routeFuel$ = this.flightroute$.pipe(map(flightroute => flightroute.fuel));

        this.initForm();
    }


    ngOnInit() {
        this.initSubscriptions();
    }


    ngOnDestroy() {
        this.cancelSubscriptions();
    }


    private initForm() {
        this.fuelForm = this.formBuilder.group({
            'aircraftConsumption': ['', [Validators.required, Validators.maxLength(3)]],
            'extraTime': ['', [Validators.maxLength(3)]]
        });
    }


    private setFormValues(consumption: Consumption, extraTime: Time) {
        this.fuelForm.setValue({
            'aircraftConsumption': consumption ? consumption.getValue(ConsumptionUnit.L_PER_H) : '',
            'extraTime': extraTime ? extraTime.getValue(TimeUnit.M) : ''
        });
    }


    private initSubscriptions() {
        // handle flightroute changes
        this.flightrouteSubscription = this.flightroute$.subscribe((flightroute) => {
            if (flightroute) {
                this.setFormValues(
                    flightroute.aircraft.consumption,
                    flightroute.extraTime);
            } else {
                this.setFormValues(
                    undefined,
                    undefined);
            }
        });

        // aircraft consumption
        this.aircraftConsumption$ = new Subject<number>();
        this.aircraftConsumptionSubscription = this.aircraftConsumption$
            .pipe(debounceTime(500))
            .subscribe(consumption => this.appStore.dispatch(new UpdateAircraftConsumptionAction(consumption)));

        // extra time
        this.extraTime$ = new Subject<number>();
        this.extraTimeSubscription = this.extraTime$
            .pipe(debounceTime(500))
            .subscribe(extraTime => this.appStore.dispatch(new UpdateExtraTimeAction(extraTime)));
    }


    private cancelSubscriptions() {
        this.flightrouteSubscription.unsubscribe();
        this.aircraftConsumptionSubscription.unsubscribe();
        this.extraTimeSubscription.unsubscribe();
    }
}
