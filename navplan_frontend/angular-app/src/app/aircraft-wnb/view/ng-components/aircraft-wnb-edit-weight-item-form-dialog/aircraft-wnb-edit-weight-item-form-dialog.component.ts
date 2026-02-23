import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WeightItem} from '../../../domain/model/weight-item';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {WeightItemType} from '../../../domain/model/weight-item-type';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {Volume} from '../../../../geo-physics/domain/model/quantities/volume';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {FuelType} from '../../../../aircraft/domain/model/fuel-type';
import {VehicleType} from '../../../../aircraft/domain/model/vehicle-type';
import {FormDialogComponent} from '../../../../common/view/ng-components/form-dialog/form-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {WeightInputComponent} from '../../../../geo-physics/view/ng-components/weight-input/weight-input.component';


@Component({
    selector: 'app-aircraft-wnb-edit-weight-item-form-dialog',
    imports: [
        FormDialogComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        WeightInputComponent,
    ],
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
    protected maxWeight: Weight | undefined;
    protected defaultWeight: Weight | undefined;


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
            const maxFuelValue = parseInt(this.editWeightItemForm.get('maxFuel').value, 10);
            const defaultFuelValue = parseInt(this.editWeightItemForm.get('defaultFuel').value, 10);
            const newWeightItem = new WeightItem(
                this.editWeightItemForm.get('type').value,
                this.editWeightItemForm.get('name').value,
                new Length(this.editWeightItemForm.get('armLong').value, this.data.wnbLengthUnit),
                new Length(this.editWeightItemForm.get('armLat').value, this.data.wnbLengthUnit),
                this.maxWeight ?? null,
                isNaN(maxFuelValue) ? null : new Volume(maxFuelValue, this.data.volumeUnit),
                this.defaultWeight ?? null,
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


    protected onMaxWeightChanged(weight: Weight) {
        this.maxWeight = weight;
    }


    protected onDefaultWeightChanged(weight: Weight) {
        this.defaultWeight = weight;
    }


    private initForm(weightItem: WeightItem) {
        this.maxWeight = weightItem?.maxWeight ?? undefined;
        this.defaultWeight = weightItem?.defaultWeight ?? undefined;
        this.editWeightItemForm = this.formBuilder.group({
            'type': [
                weightItem ? weightItem.type : null,
                [Validators.required]
            ],
            'name': [
                weightItem ? weightItem.name : '',
                [Validators.required, Validators.maxLength(30)]
            ],
            'armLong': [
                (weightItem && weightItem.armLong)
                    ? StringnumberHelper.roundToDigits(weightItem.armLong.getValue(this.data.wnbLengthUnit), 3)
                    : '',
                [Validators.required, Validators.min(-99999), Validators.max(99999)]
            ],
            'armLat': [
                (weightItem && weightItem.armLat)
                    ? StringnumberHelper.roundToDigits(weightItem.armLat.getValue(this.data.wnbLengthUnit), 3)
                    : 0,
                [Validators.required, Validators.min(-99999), Validators.max(99999)]
            ],
            'maxFuel': [
                (weightItem && weightItem.maxFuel)
                    ? StringnumberHelper.roundToDigits(weightItem.maxFuel.getValue(this.data.volumeUnit), 0)
                    : '',
                [Validators.min(1), Validators.max(99999)]
            ],
            'defaultFuel': [
                (weightItem && weightItem.defaultFuel)
                    ? StringnumberHelper.roundToDigits(weightItem.defaultFuel.getValue(this.data.volumeUnit), 0)
                    : '',
                [Validators.min(0), Validators.max(99999)]
            ]
        });
    }


    private getType(): WeightItemType {
        return this.editWeightItemForm.get('type').value;
    }
}
