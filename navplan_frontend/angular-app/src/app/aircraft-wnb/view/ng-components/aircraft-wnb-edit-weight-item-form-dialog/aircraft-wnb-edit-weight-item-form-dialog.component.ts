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
import {FuelType} from '../../../../aircraft/domain/model/fuel-type';
import {VehicleType} from '../../../../aircraft/domain/model/vehicle-type';
import {FormDialogComponent} from '../../../../common/view/ng-components/form-dialog/form-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {WeightInputComponent} from '../../../../geo-physics/view/ng-components/weight-input/weight-input.component';
import {WnbLengthInputComponent} from '../../../../geo-physics/view/ng-components/wnb-length-input/wnb-length-input.component';
import {FuelInputComponent} from '../../../../geo-physics/view/ng-components/fuel-input/fuel-input.component';


@Component({
    selector: 'app-aircraft-wnb-edit-weight-item-form-dialog',
    imports: [
        FormDialogComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        WeightInputComponent,
        WnbLengthInputComponent,
        FuelInputComponent,
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
    protected maxWeight: Weight | undefined;
    protected defaultWeight: Weight | undefined;
    protected armLong: Length | undefined;
    protected armLat: Length | undefined;
    protected maxFuel: Volume | undefined;
    protected defaultFuel: Volume | undefined;


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
        if (this.editWeightItemForm.valid && this.armLong != null) {
            const newWeightItem = new WeightItem(
                this.editWeightItemForm.get('type').value,
                this.editWeightItemForm.get('name').value,
                this.armLong,
                this.armLat ?? null,
                this.maxWeight ?? null,
                this.maxFuel ?? null,
                this.defaultWeight ?? null,
                this.defaultFuel ?? null,
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


    protected onArmLongChanged(length: Length) {
        this.armLong = length;
    }


    protected onArmLatChanged(length: Length) {
        this.armLat = length;
    }


    protected onMaxFuelChanged(volume: Volume) {
        this.maxFuel = volume;
    }


    protected onDefaultFuelChanged(volume: Volume) {
        this.defaultFuel = volume;
    }


    private initForm(weightItem: WeightItem) {
        this.maxWeight = weightItem?.maxWeight ?? undefined;
        this.defaultWeight = weightItem?.defaultWeight ?? undefined;
        this.armLong = weightItem?.armLong ?? undefined;
        this.armLat = weightItem?.armLat ?? undefined;
        this.maxFuel = weightItem?.maxFuel ?? undefined;
        this.defaultFuel = weightItem?.defaultFuel ?? undefined;
        this.editWeightItemForm = this.formBuilder.group({
            'type': [
                weightItem ? weightItem.type : null,
                [Validators.required]
            ],
            'name': [
                weightItem ? weightItem.name : '',
                [Validators.required, Validators.maxLength(30)]
            ],
        });
    }


    private getType(): WeightItemType {
        return this.editWeightItemForm.get('type').value;
    }
}
