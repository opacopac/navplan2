import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeightItem} from '../../../domain/model/weight-item';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {Volume} from '../../../../geo-physics/domain/model/quantities/volume';
import {FuelType} from '../../../domain/model/fuel-type';
import {WeightItemType} from '../../../domain/model/weight-item-type';


@Component({
    selector: 'app-aircraft-wnb-edit-item-form',
    templateUrl: './aircraft-wnb-edit-item-form.component.html',
    styleUrls: ['./aircraft-wnb-edit-item-form.component.scss']
})
export class AircraftWnbEditItemFormComponent implements OnInit, OnChanges {
    @Input() weightItem: WeightItem;
    @Input() wnbLengthUnit: LengthUnit;
    @Input() weightUnit: WeightUnit;
    @Input() volumeUnit: VolumeUnit;
    @Output() onSaveClick = new EventEmitter<WeightItem>();
    @Output() onCancelClick = new EventEmitter<null>();

    protected editWeightItemForm: FormGroup;
    protected readonly FuelType = FuelType;
    protected readonly WeightItemType = WeightItemType;
    protected readonly Weight = Weight;
    protected readonly Volume = Volume;
    protected readonly Length = Length;


    constructor(public formBuilder: FormBuilder) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initForm(this.weightItem);
    }


    protected isTypeFuel(): boolean {
        const value = this.editWeightItemForm.get('type').value;
        return value !== null && value === WeightItemType.FUEL;
    }



    protected getSaveButtonText() {
        return this.weightItem ? 'Apply' : 'Add';
    }


    protected onSaveClicked() {
        if (this.editWeightItemForm.valid) {
            const maxWeightValue = parseInt(this.editWeightItemForm.get('maxWeight').value, 10);
            const maxFuelValue = parseInt(this.editWeightItemForm.get('maxFuel').value, 10);
            const newWeightItem = new WeightItem(
                this.editWeightItemForm.get('type').value,
                this.editWeightItemForm.get('name').value,
                new Length(this.editWeightItemForm.get('arm').value, this.wnbLengthUnit),
                isNaN(maxWeightValue) ? null : new Weight(maxWeightValue, this.weightUnit),
                isNaN(maxFuelValue) ? null : new Volume(maxFuelValue, this.volumeUnit)
            );

            this.onSaveClick.emit(newWeightItem);
        }
    }


    protected onCancelClicked() {
        this.onCancelClick.emit();
    }


    private initForm(weightItem: WeightItem) {
        this.editWeightItemForm = this.formBuilder.group({
            'type': [
                weightItem ? weightItem.type : null, [
                    Validators.required
                ]
            ],
            'name': [
                weightItem ? weightItem.name : '', [
                    Validators.required,
                    Validators.maxLength(30)
                ]
            ],
            'arm': [
                (weightItem && weightItem.arm) ? weightItem.arm.getValue(this.wnbLengthUnit) : '', [
                    Validators.required,
                    Validators.min(-99999),
                    Validators.max(99999),
                ]
            ],
            'maxWeight': [
                (weightItem && weightItem.maxWeight) ? weightItem.maxWeight.getValue(this.weightUnit) : '', [
                    Validators.min(1),
                    Validators.max(99999),
                ]
            ],
            'maxFuel': [
                (weightItem && weightItem.maxFuel) ? weightItem.maxFuel.getValue(this.volumeUnit) : '', [
                    Validators.min(1),
                    Validators.max(99999),
                ]
            ]
        });
    }
}
