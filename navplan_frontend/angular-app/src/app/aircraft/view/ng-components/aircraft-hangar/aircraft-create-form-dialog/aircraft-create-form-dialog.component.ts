import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Speed} from '../../../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../../../geo-physics/domain/model/quantities/consumption';
import {VehicleType} from '../../../../domain/model/vehicle-type';
import {FuelType} from '../../../../domain/model/fuel-type';
import {SpeedUnit} from '../../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../../geo-physics/domain/model/quantities/consumption-unit';
import {Aircraft} from '../../../../domain/model/aircraft';
import {FormDialogComponent} from '../../../../../common/view/ng-components/form-dialog/form-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
    AircraftTypeDesignatorAutocompleteComponent
} from '../../aircraft-details/aircraft-type-designator-autocomplete/aircraft-type-designator-autocomplete.component';
import {HorizontalSpeedInputComponent} from '../../../../../geo-physics/view/ng-components/horizontal-speed-input/horizontal-speed-input.component';
import {ConsumptionInputComponent} from '../../../../../geo-physics/view/ng-components/consumption-input/consumption-input.component';


@Component({
    selector: 'app-aircraft-create-form-dialog',
    imports: [
        ReactiveFormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormDialogComponent,
        AircraftTypeDesignatorAutocompleteComponent,
        HorizontalSpeedInputComponent,
        ConsumptionInputComponent,
    ],
    templateUrl: './aircraft-create-form-dialog.component.html',
    styleUrls: ['./aircraft-create-form-dialog.component.scss']
})
export class AircraftCreateFormDialogComponent implements OnInit, OnChanges {
    protected createForm: FormGroup;
    protected readonly VehicleType = VehicleType;
    protected readonly FuelType = FuelType;
    protected aircraftIcaoType: string;
    protected isAircraftIcaoTypeValid: boolean;
    protected cruiseSpeed: Speed | undefined;
    protected cruiseFuel: Consumption | undefined;


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
        return this.createForm && this.createForm.valid && this.isAircraftIcaoTypeValid
            && this.cruiseSpeed != null && this.cruiseFuel != null;
    }


    protected onCruiseSpeedChanged(speed: Speed) {
        this.cruiseSpeed = speed;
    }


    protected onCruiseFuelChanged(consumption: Consumption) {
        this.cruiseFuel = consumption;
    }


    protected onSaveClicked() {
        if (this.isFormValid()) {
            const newAircraft = Aircraft.createMinimal(
                this.createForm.controls['vehicleType'].value,
                this.createForm.controls['registration'].value,
                this.aircraftIcaoType,
                this.cruiseSpeed,
                this.cruiseFuel,
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
            'fuelType': [FuelType.MOGAS, [Validators.required]]
        });
    }
}
