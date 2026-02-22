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


@Component({
    selector: 'app-route-create-form-dialog',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormDialogComponent,
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
        return this.createForm && this.createForm.valid;
    }


    protected onSaveClicked() {
        if (this.isFormValid()) {
            const newRoute = Flightroute.createEmpty(
                this.createForm.controls['title'].value,
                new AircraftParams(
                    new Speed(
                        this.createForm.controls['cruiseSpeed'].value,
                        this.data.speedUnit
                    ),
                    new Consumption(
                        this.createForm.controls['cruiseFuel'].value,
                        this.data.consumptionUnit
                    )
                )
            );
            const cruiseAltValue = this.createForm.controls['cruiseAlt'].value;
            if (cruiseAltValue !== null && cruiseAltValue !== '') {
                newRoute.cruiseAltitude = new Length(parseFloat(cruiseAltValue), this.data.altitudeUnit);
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
            'cruiseAlt': ['',
                [
                    Validators.min(0),
                    Validators.max(99999),
                    Validators.pattern('^[0-9]*$')
                ]
            ]
        });
    }
}
