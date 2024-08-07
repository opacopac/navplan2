import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Aircraft} from '../../../domain/model/aircraft';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {FormControl, Validators} from '@angular/forms';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {WeightItem} from '../../../domain/model/weight-item';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';


export interface ListEntry {
    id: number;
    registration: string;
    type: string;
}


@Component({
    selector: 'app-aircraft-wnb',
    templateUrl: './aircraft-wnb.component.html',
    styleUrls: ['./aircraft-wnb.component.scss']
})
export class AircraftWnbComponent implements OnInit {
    @Input() currentAircraft: Aircraft;
    @Input() wnbLengthUnit: LengthUnit;
    @Input() weightUnit: WeightUnit;
    @Input() volumeUnit: VolumeUnit;
    @Output() changeMtow = new EventEmitter<Weight>();
    @Output() changeBew = new EventEmitter<Weight>();
    @Output() addWeightItem = new EventEmitter<WeightItem>();
    @Output() editWeightItem = new EventEmitter<[WeightItem, number]>();
    @Output() deleteWeightItem = new EventEmitter<number>();
    @Output() saveAircraftWnb = new EventEmitter<void>();

    protected mtowInput: FormControl;
    protected bewInput: FormControl;
    protected readonly Speed = Speed;
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


    protected isValidWnbForm(): boolean {
        return this.mtowInput.valid && this.bewInput.valid;
    }


    protected onSaveAircraftWnbClicked() {
        if (this.isValidWnbForm()) {
            this.saveAircraftWnb.emit();
        }
    }
}
