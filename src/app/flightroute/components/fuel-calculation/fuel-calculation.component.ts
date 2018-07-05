import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteFuel} from '../../model/routefuel';
import {Time} from '../../../model/quantities/time';
import {StringnumberService} from '../../../core/services/utils/stringnumber.service';
import {TimeUnit, VolumeUnit} from '../../../core/services/utils/unitconversion.service';
import {Fuel} from '../../../model/quantities/fuel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-fuel-calculation',
    templateUrl: './fuel-calculation.component.html',
    styleUrls: ['./fuel-calculation.component.css']
})
export class FuelCalculationComponent implements OnInit {
    @Output() onInputExtraTime = new EventEmitter<string>();
    public _routeFuel: RouteFuel;
    public extraTimeForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
        this.initForm();
    }


    @Input()
    set routeFuel(value: RouteFuel) {
        this._routeFuel = value;
        if (value) {
            this.setFormValues(value.extraTime);
        } else {
            this.setFormValues(undefined);
        }
    }


    ngOnInit() {
    }


    private initForm() {
        this.extraTimeForm = this.formBuilder.group({
            'extraTime': [undefined, [Validators.required, Validators.maxLength(3)]]
        });
    }


    private setFormValues(extraTime: Time) {
        this.extraTimeForm.setValue({ extraTime: extraTime ? extraTime.getValue(TimeUnit.M) : '' }); // TODO
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
