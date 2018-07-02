import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteFuel} from '../../model/routefuel';
import {Time} from '../../../model/quantities/time';
import {StringnumberService} from '../../../services/utils/stringnumber.service';
import {TimeUnit, VolumeUnit} from '../../../services/utils/unitconversion.service';
import {Fuel} from '../../../model/quantities/fuel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-fuel-calculation',
    templateUrl: './fuel-calculation.component.html',
    styleUrls: ['./fuel-calculation.component.css']
})
export class FuelCalculationComponent implements OnInit {
    @Output() onInputExtraTime: EventEmitter<string>;
    public _routeFuel: RouteFuel;
    public extraTimeForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    @Input()
    set routeFuel(value: RouteFuel) {
        this._routeFuel = value;
        this.setFormValues(value.extraTime);
    }


    ngOnInit() {
        this.initForm();
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
