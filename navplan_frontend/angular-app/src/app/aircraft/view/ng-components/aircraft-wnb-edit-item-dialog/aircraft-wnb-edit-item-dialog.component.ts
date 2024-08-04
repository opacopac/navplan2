import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AircraftWnbEditItemFormComponent} from '../aircraft-wnb-edit-item-form/aircraft-wnb-edit-item-form.component';
import {WeightItem} from '../../../domain/model/weight-item';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {VolumeUnit} from '../../../../geo-physics/domain/model/quantities/volume-unit';


@Component({
    selector: 'app-aircraft-wnb-edit-item-container',
    templateUrl: './aircraft-wnb-edit-item-dialog.component.html',
    styleUrls: ['./aircraft-wnb-edit-item-dialog.component.scss']
})
export class AircraftWnbEditItemDialogComponent implements OnInit, OnDestroy {
    constructor(
        private dialogRef: MatDialogRef<AircraftWnbEditItemFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            weightItem: WeightItem;
            allowAircraftType: boolean;
            wnbLengthUnit: LengthUnit;
            weightUnit: WeightUnit;
            volumeUnit: VolumeUnit;
        },
    ) {
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }


    protected getDialogTitle(): string {
        return this.data.weightItem ? 'Edit weight item' : 'Add weight item';
    }


    protected onSaveClicked(newWeightItem: WeightItem) {
        this.dialogRef.close(newWeightItem);
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }
}
