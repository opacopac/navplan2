import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteFuel} from '../../model/routefuel';
import {StringnumberService} from '../../../shared/services/stringnumber/stringnumber.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Time} from '../../../shared/model/quantities/time';
import {TimeUnit, VolumeUnit} from '../../../shared/model/units';
import {Fuel} from '../../../shared/model/quantities/fuel';


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
            return '' + Math.ceil(fuel.getValue(VolumeUnit.L)); // TODO
        } else {
            return '';
        }
    }
}
