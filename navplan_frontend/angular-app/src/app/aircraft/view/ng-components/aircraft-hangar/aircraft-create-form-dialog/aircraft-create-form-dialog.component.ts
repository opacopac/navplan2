import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {VehicleType} from '../../../../domain/model/vehicle-type';
import {FuelType} from '../../../../domain/model/fuel-type';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {Aircraft} from '../../../../domain/model/aircraft';


@Component({
    selector: 'app-aircraft-create-form-dialog',
    templateUrl: './aircraft-create-form-dialog.component.html',
    styleUrls: ['./aircraft-create-form-dialog.component.scss']
})
export class AircraftCreateFormDialogComponent implements OnInit, OnChanges {
    protected createForm: FormGroup;
    protected readonly Speed = Speed;
    protected readonly Consumption = Consumption;
    protected readonly VehicleType = VehicleType;
    protected readonly FuelType = FuelType;
    protected aircraftIcaoType: string;
    protected isAircraftIcaoTypeValid: boolean;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AircraftCreateFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            speedUnit: SpeedUnit;
            consumptionUnit: ConsumptionUnit;
        }
    ) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
        this.initForm();
    }


    protected isFormValid(): boolean {
        return this.createForm && this.createForm.valid && this.isAircraftIcaoTypeValid;
    }


    protected onSaveClicked() {
        if (this.isFormValid()) {
            const newAircraft = Aircraft.createMinimal(
                this.createForm.controls['vehicleType'].value,
                this.createForm.controls['registration'].value,
                this.aircraftIcaoType,
                new Speed(
                    this.createForm.controls['cruiseSpeed'].value,
                    this.data.speedUnit
                ),
                new Consumption(
                    this.createForm.controls['cruiseFuel'].value,
                    this.data.consumptionUnit
                ),
                this.createForm.controls['fuelType'].value,
            );

            this.dialogRef.close({aircraft: newAircraft});
        }
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }


    private initForm() {
        this.createForm = this.formBuilder.group({
            'vehicleType': [VehicleType.AIRPLANE, [Validators.required]],
            'registration': ['', [Validators.required]],
            'cruiseSpeed': ['',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999)
                ]
            ],
            'cruiseFuel': ['',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(999)
                ]
            ],
            'fuelType': [FuelType.MOGAS, [Validators.required]]
        });
    }
}
