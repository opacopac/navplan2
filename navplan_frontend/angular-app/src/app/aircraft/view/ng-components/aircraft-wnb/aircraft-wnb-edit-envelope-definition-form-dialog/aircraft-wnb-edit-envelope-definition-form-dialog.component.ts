import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {WnbEnvelope} from '../../../../domain/model/wnb-envelope';
import {WnbEnvelopeAxisType} from '../../../../domain/model/wnb-envelope-axis-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleType} from '../../../../domain/model/vehicle-type';


@Component({
    selector: 'app-aircraft-wnb-edit-envelope-definition-form-dialog',
    templateUrl: './aircraft-wnb-edit-envelope-definition-form-dialog.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope-definition-form-dialog.component.scss']
})
export class AircraftWnbEditEnvelopeDefinitionFormDialogComponent implements OnInit, OnChanges {
    protected readonly WnbEnvelopeAxisType = WnbEnvelopeAxisType;
    protected readonly VehicleType = VehicleType;
    protected editForm: FormGroup;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AircraftWnbEditEnvelopeDefinitionFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            isNewEnvelope: boolean;
            envelope: WnbEnvelope;
            vehicleType: VehicleType;
            lengthUnit: LengthUnit;
            weightUnit: WeightUnit;
        }
    ) {
    }


    ngOnInit() {
        this.initForm(this.data.envelope);
    }


    ngOnChanges() {
        this.initForm(this.data.envelope);
    }


    protected getDialogTitle(): string {
        return this.data.isNewEnvelope ? 'Add Envelope' : 'Edit Envelope';
    }


    protected getSaveButtonText() {
        return this.data.isNewEnvelope ? 'Add' : 'Update';
    }


    protected onSaveClicked() {
        const newEnvelope = new WnbEnvelope(
            this.editForm.controls['name'].value,
            this.editForm.controls['axisType'].value,
            this.data.envelope ? this.data.envelope.lonEnvelope : [],
            this.data.envelope ? this.data.envelope.latEnvelope : []
        );

        if (this.data.isNewEnvelope) {
            this.dialogRef.close({action: 'add', envelope: newEnvelope});
        } else {
            this.dialogRef.close({action: 'update', oldEnvelope: this.data.envelope, newEnvelope: newEnvelope});
        }
    }


    protected onDeleteClicked() {
        this.dialogRef.close({action: 'delete', envelope: this.data.envelope});
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }


    private initForm(envelope: WnbEnvelope) {
        this.editForm = this.formBuilder.group({
            'name': [
                (envelope)
                    ? envelope.name
                    : '',
                [
                    Validators.required
                ]
            ],
            'axisType': [
                (envelope)
                    ? envelope.axisType
                    : WnbEnvelopeAxisType.WEIGHT_ARM,
                [
                    Validators.required
                ]
            ]
        });
    }
}
