import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Speed} from '../../../../geo-physics/domain/model/quantities/speed';
import {Consumption} from '../../../../geo-physics/domain/model/quantities/consumption';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {SpeedUnit} from '../../../../geo-physics/domain/model/quantities/speed-unit';
import {ConsumptionUnit} from '../../../../geo-physics/domain/model/quantities/consumption-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Flightroute} from '../../../../flightroute/domain/model/flightroute';
import {AircraftParams} from '../../../../flightroute/domain/model/aircraftParams';
import {FormDialogComponent} from '../../../../common/view/ng-components/form-dialog/form-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HorizontalSpeedInputComponent} from '../../../../geo-physics/view/ng-components/horizontal-speed-input/horizontal-speed-input.component';
import {ConsumptionInputComponent} from '../../../../geo-physics/view/ng-components/consumption-input/consumption-input.component';
import {AltitudeInputComponent} from '../../../../geo-physics/view/ng-components/altitude-input/altitude-input.component';


@Component({
    selector: 'app-route-create-form-dialog',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormDialogComponent,
        HorizontalSpeedInputComponent,
        ConsumptionInputComponent,
        AltitudeInputComponent,
    ],
    templateUrl: './route-create-form-dialog.component.html',
    styleUrls: ['./route-create-form-dialog.component.scss']
})
export class RouteCreateFormDialogComponent implements OnInit, OnChanges {
    protected createForm: FormGroup;
    protected readonly Speed = Speed;
    protected readonly Consumption = Consumption;
    protected readonly Length = Length;
    protected title: string;
    protected cruiseSpeed: Speed | undefined;
    protected cruiseConsumption: Consumption | undefined;
    protected cruiseAltitude: Length | undefined;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<RouteCreateFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            speedUnit: SpeedUnit;
            consumptionUnit: ConsumptionUnit;
            altitudeUnit: LengthUnit;
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
        return this.createForm && this.createForm.valid
            && this.cruiseSpeed != null
            && this.cruiseConsumption != null;
    }


    protected onCruiseSpeedChanged(speed: Speed) {
        this.cruiseSpeed = speed;
    }


    protected onCruiseConsumptionChanged(consumption: Consumption) {
        this.cruiseConsumption = consumption;
    }


    protected onCruiseAltitudeChanged(length: Length) {
        this.cruiseAltitude = length;
    }


    protected onSaveClicked() {
        if (this.isFormValid()) {
            const newRoute = Flightroute.createEmpty(
                this.createForm.controls['title'].value,
                new AircraftParams(
                    this.cruiseSpeed,
                    this.cruiseConsumption
                )
            );
            if (this.cruiseAltitude != null) {
                newRoute.cruiseAltitude = this.cruiseAltitude;
            }

            this.dialogRef.close({aircraft: newRoute});
        }
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }


    private initForm() {
        this.createForm = this.formBuilder.group({
            'title': ['', [Validators.required]],
        });
    }
}
