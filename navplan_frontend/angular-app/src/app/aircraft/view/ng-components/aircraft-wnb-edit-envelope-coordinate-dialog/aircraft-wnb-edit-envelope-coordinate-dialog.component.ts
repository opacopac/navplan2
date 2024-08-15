import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';
import {
    AircraftWnbEditEnvelopeCoordinateFormComponent
} from '../aircraft-wnb-edit-envelope-coordinate-form/aircraft-wnb-edit-envelope-coordinate-form.component';


@Component({
    selector: 'app-aircraft-wnb-edit-envelope-coordinate-dialog',
    templateUrl: './aircraft-wnb-edit-envelope-coordinate-dialog.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope-coordinate-dialog.component.scss']
})
export class AircraftWnbEditEnvelopeCoordinateDialogComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<AircraftWnbEditEnvelopeCoordinateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            coordinate: WnbEnvelopeCoordinate
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
        return this.data.coordinate ? 'Edit Coordinate' : 'Add Coordinate';
    }


    protected onSaveClicked(newCoordinate: WnbEnvelopeCoordinate) {
        this.dialogRef.close(newCoordinate);
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }
}
