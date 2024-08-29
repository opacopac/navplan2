import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {
    AircraftWnbEditEnvelopeCoordinateFormComponent
} from '../aircraft-wnb-edit-envelope-coordinate-form/aircraft-wnb-edit-envelope-coordinate-form.component';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';


@Component({
    selector: 'app-aircraft-wnb-edit-envelope-definition-dialog',
    templateUrl: './aircraft-wnb-edit-envelope-definition-dialog.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope-definition-dialog.component.scss']
})
export class AircraftWnbEditEnvelopeDefinitionDialogComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<AircraftWnbEditEnvelopeCoordinateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            isNewEnvelope: boolean;
            envelope: WnbEnvelope;
            lengthUnit: LengthUnit;
            weightUnit: WeightUnit;
        },
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    protected getDialogTitle(): string {
        return this.data.isNewEnvelope ? 'Add Envelope' : 'Edit Envelope';
    }


    protected onAddClicked(envelope: WnbEnvelope) {
        this.dialogRef.close({action: 'add', envelope: envelope});
    }


    protected onUpdateClicked(envelope: WnbEnvelope) {
        this.dialogRef.close({action: 'update', oldEnvelope: this.data.envelope, newEnvelope: envelope});
    }


    protected onDeleteClicked(envelope: WnbEnvelope) {
        this.dialogRef.close({action: 'delete', envelope: envelope});
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }
}
