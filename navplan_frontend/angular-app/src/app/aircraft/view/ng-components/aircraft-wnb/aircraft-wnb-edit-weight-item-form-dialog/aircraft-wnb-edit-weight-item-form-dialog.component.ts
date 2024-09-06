import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WeightItem} from '../../../../domain/model/weight-item';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {VolumeUnit} from '../../../../../geo-physics/domain/model/quantities/volume-unit';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';
import {WeightItemType} from '../../../../domain/model/weight-item-type';
import {Weight} from '../../../../../geo-physics/domain/model/quantities/weight';
import {Volume} from '../../../../../geo-physics/domain/model/quantities/volume';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';
import {FuelType} from '../../../../domain/model/fuel-type';
import {VehicleType} from '../../../../domain/model/vehicle-type';


@Component({
    selector: 'app-aircraft-wnb-edit-weight-item-form-dialog',
    templateUrl: './aircraft-wnb-edit-weight-item-form-dialog.component.html',
    styleUrls: ['./aircraft-wnb-edit-weight-item-form-dialog.component.scss']
})
export class AircraftWnbEditWeightItemFormDialogComponent implements OnInit, OnChanges {
    protected editWeightItemForm: FormGroup;
    protected readonly WeightItemType = WeightItemType;
    protected readonly VehicleType = VehicleType;
    protected readonly FuelType = FuelType;
    protected readonly Weight = Weight;
    protected readonly Volume = Volume;
    protected readonly Length = Length;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AircraftWnbEditWeightItemFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            weightItem: WeightItem;
            vehicleType: VehicleType;
            allowAircraftType: boolean;
            wnbLengthUnit: LengthUnit;
            weightUnit: WeightUnit;
            volumeUnit: VolumeUnit;
        },
    ) {
    }


    ngOnInit() {
        this.initForm(this.data.weightItem);
    }


    ngOnChanges() {
        this.initForm(this.data.weightItem);
    }


    protected getDialogTitle(): string {
        return this.data.weightItem ? 'Edit weight item' : 'Add weight item';
    }


    protected onTypeChanged() {
        if (this.getType() === WeightItemType.AIRCRAFT) {
            this.editWeightItemForm.get('name').setValue('Empty Aircraft');
        }
    }


    protected isTypeAircraft(): boolean {
        const value = this.getType();
        return value !== null && value === WeightItemType.AIRCRAFT;
    }


    protected isTypeFuel(): boolean {
        const value = this.getType();
        return value !== null && value === WeightItemType.FUEL;
    }


    protected getSaveButtonText() {
        return this.data.weightItem ? 'Apply' : 'Add';
    }


    protected onSaveClicked() {
        if (this.editWeightItemForm.valid) {
            const maxWeightValue = parseInt(this.editWeightItemForm.get('maxWeight').value, 10);
            const maxFuelValue = parseInt(this.editWeightItemForm.get('maxFuel').value, 10);
            const defaultWeightValue = parseInt(this.editWeightItemForm.get('defaultWeight').value, 10);
            const defaultFuelValue = parseInt(this.editWeightItemForm.get('defaultFuel').value, 10);
            const newWeightItem = new WeightItem(
                this.editWeightItemForm.get('type').value,
                this.editWeightItemForm.get('name').value,
                new Length(this.editWeightItemForm.get('armLong').value, this.data.wnbLengthUnit),
                new Length(this.editWeightItemForm.get('armLat').value, this.data.wnbLengthUnit),
                isNaN(maxWeightValue) ? null : new Weight(maxWeightValue, this.data.weightUnit),
                isNaN(maxFuelValue) ? null : new Volume(maxFuelValue, this.data.volumeUnit),
                isNaN(defaultWeightValue) ? null : new Weight(defaultWeightValue, this.data.weightUnit),
                isNaN(defaultFuelValue) ? null : new Volume(defaultFuelValue, this.data.volumeUnit),
                null,
                null
            );

            this.dialogRef.close(newWeightItem);
        }
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }


    private initForm(weightItem: WeightItem) {
        this.editWeightItemForm = this.formBuilder.group({
            'type': [
                weightItem ? weightItem.type : null,
                [
                    Validators.required
                ]
            ],
            'name': [
                weightItem ? weightItem.name : '',
                [
                    Validators.required,
                    Validators.maxLength(30)
                ]
            ],
            'armLong': [
                (weightItem && weightItem.armLong)
                    ? StringnumberHelper.roundToDigits(weightItem.armLong.getValue(this.data.wnbLengthUnit), 3)
                    : '',
                [
                    Validators.required,
                    Validators.min(-99999),
                    Validators.max(99999),
                ]
            ],
            'armLat': [
                (weightItem && weightItem.armLat)
                    ? StringnumberHelper.roundToDigits(weightItem.armLat.getValue(this.data.wnbLengthUnit), 3)
                    : 0,
                [
                    Validators.required,
                    Validators.min(-99999),
                    Validators.max(99999),
                ]
            ],
            'maxWeight': [
                (weightItem && weightItem.maxWeight)
                    ? StringnumberHelper.roundToDigits(weightItem.maxWeight.getValue(this.data.weightUnit), 0)
                    : '',
                [
                    Validators.min(1),
                    Validators.max(99999),
                ]
            ],
            'maxFuel': [
                (weightItem && weightItem.maxFuel)
                    ? StringnumberHelper.roundToDigits(weightItem.maxFuel.getValue(this.data.volumeUnit), 0)
                    : '',
                [
                    Validators.min(1),
                    Validators.max(99999),
                ]
            ],
            'defaultWeight': [
                (weightItem && weightItem.defaultWeight)
                    ? StringnumberHelper.roundToDigits(weightItem.defaultWeight.getValue(this.data.weightUnit), 0)
                    : '',
                [
                    Validators.min(0),
                    Validators.max(99999),
                ]
            ],
            'defaultFuel': [
                (weightItem && weightItem.defaultFuel)
                    ? StringnumberHelper.roundToDigits(weightItem.defaultFuel.getValue(this.data.volumeUnit), 0)
                    : '',
                [
                    Validators.min(0),
                    Validators.max(99999),
                ]
            ]
        });
    }


    private getType(): WeightItemType {
        return this.editWeightItemForm.get('type').value;
    }
}
