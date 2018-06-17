import 'rxjs/add/operator/first';
import 'rxjs/add/operator/distinctUntilChanged';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/sessioncontext';
import {Time} from '../../model/units/time';
import {Fuel} from '../../model/units/fuel';
import {TimeUnit, VolumeUnit} from '../../services/utils/unitconversion.service';
import {StringnumberService} from '../../services/utils/stringnumber.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'app-fuelcalc',
    templateUrl: './fuelcalc.component.html',
    styleUrls: ['./fuelcalc.component.css']
})
export class FuelcalcComponent implements OnInit, OnDestroy {
    public session: Sessioncontext;
    public extraTimeForm: FormGroup;
    private flightRouteSubscription: Subscription;


    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
    }


    ngOnInit() {
        this.initForm();
        // when flightroute is updated => update extra time field
        this.flightRouteSubscription = this.session.flightroute$
            .withLatestFrom(this.session.flightroute$.flatMap(route => route.fuel.extraTime$))
            .subscribe(([route, extraTime]) => {
                this.extraTimeForm.setValue({ extraTime: extraTime.min });
            });
    }


    ngOnDestroy() {
        this.flightRouteSubscription.unsubscribe();
    }


    private initForm() {
        this.extraTimeForm = this.formBuilder.group({
            'extraTime': [undefined, [Validators.required, Validators.maxLength(3)]]
        });
    }


    public updateExtraTime(extraTimeMin: string) {
        const timeMin = Number(extraTimeMin)
        if (timeMin !== undefined && timeMin >= 0) {
            this.session.flightroute$
                .first()
                .subscribe((route) => {
                    route.fuel.extraTime = new Time(timeMin, TimeUnit.M);
                });
        }
    }


    public formatTime(time: Time): string {
        if (time && time.min > 0) {
            const hm = time.getHourMinutes();
            return StringnumberService.zeroPad(hm[0], 2) + ':' + StringnumberService.zeroPad(hm[1], 2);
        } else {
            return '';
        }
    }


    public formatFuel(fuel: Fuel): string {
        if (fuel) {
            return '' + fuel.getValue(VolumeUnit.L);
        } else {
            return '';
        }
    }
}
