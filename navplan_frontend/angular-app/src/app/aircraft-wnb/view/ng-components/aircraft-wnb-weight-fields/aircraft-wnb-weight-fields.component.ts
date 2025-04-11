import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../../aircraft/domain/model/aircraft';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-aircraft-wnb-weight-fields',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './aircraft-wnb-weight-fields.component.html',
    styleUrls: ['./aircraft-wnb-weight-fields.component.scss']
})
export class AircraftWnbWeightFieldsComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() weightUnit: WeightUnit;
    @Output() changeMtow = new EventEmitter<Weight>();
    @Output() changeBew = new EventEmitter<Weight>();

    protected mtowInput: FormControl;
    protected bewInput: FormControl;
    protected readonly Weight = Weight;

    constructor() {
    }


    ngOnInit() {
        if (!this.currentAircraft) {
            return;
        }

        const mtowValue = this.currentAircraft.mtow
            ? StringnumberHelper.roundToDigits(this.currentAircraft.mtow.getValue(this.weightUnit), 0).toString()
            : '';
        this.mtowInput = new FormControl(mtowValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99999)
        ]);
        const bewValue = this.currentAircraft.bew
            ? StringnumberHelper.roundToDigits(this.currentAircraft.bew.getValue(this.weightUnit), 0).toString()
            : '';
        this.bewInput = new FormControl(bewValue, [
            Validators.required,
            Validators.min(1),
            Validators.max(99999)
        ]);
    }


    protected onBewChange() {
        if (this.bewInput.valid) {
            const bewValue = this.bewInput.value;
            this.changeBew.emit(new Weight(bewValue, this.weightUnit));
        }
    }


    protected onMtowChange() {
        if (this.mtowInput.valid) {
            const mtowValue = this.mtowInput.value;
            this.changeMtow.emit(new Weight(mtowValue, this.weightUnit));
        }
    }


    protected isValidForm(): boolean {
        return this.mtowInput.valid && this.bewInput.valid;
    }
}
