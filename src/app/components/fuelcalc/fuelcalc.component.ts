import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Time} from '../../model/quantities/time';
import {Fuel} from '../../model/quantities/fuel';
import {TimeUnit, VolumeUnit} from '../../services/utils/unitconversion.service';
import {StringnumberService} from '../../services/utils/stringnumber.service';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {Flightroute} from "../../flightroute/model/flightroute";


@Component({
    selector: 'app-fuelcalc',
    templateUrl: './fuelcalc.component.html',
    styleUrls: ['./fuelcalc.component.css']
})
export class FuelcalcComponent implements OnInit, OnDestroy {
    @Input() flightroute: Flightroute;
    @Output() onInputExtraTime: EventEmitter<string>;
    public extraTimeForm: FormGroup;


    constructor(
        private appStore: Store<AppState>,
        private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnDestroy() {
    }


    private initForm() {
        this.extraTimeForm = this.formBuilder.group({
            'extraTime': [undefined, [Validators.required, Validators.maxLength(3)]]
        });
    }


    private setFormValues(extraTime: Time) {
        this.extraTimeForm.setValue({ extraTime: extraTime.getValue(TimeUnit.M) }); // TODO
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
