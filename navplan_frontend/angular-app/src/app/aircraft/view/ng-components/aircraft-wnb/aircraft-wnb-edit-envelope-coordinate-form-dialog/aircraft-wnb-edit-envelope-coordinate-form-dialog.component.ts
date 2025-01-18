import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {WeightUnit} from '../../../../../geo-physics/domain/model/quantities/weight-unit';
import {WnbLonEnvelopeCoordinate} from '../../../../domain/model/wnb-lon-envelope-coordinate';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../../../geo-physics/domain/model/quantities/weight';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StringnumberHelper} from '../../../../../system/domain/service/stringnumber/stringnumber-helper';


@Component({
    selector: 'app-aircraft-wnb-edit-envelope-coordinate-form-dialog',
    templateUrl: './aircraft-wnb-edit-envelope-coordinate-form-dialog.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope-coordinate-form-dialog.component.scss']
})
export class AircraftWnbEditEnvelopeCoordinateFormDialogComponent implements OnInit, OnChanges {
    protected editCoordinateForm: FormGroup;
    protected readonly Weight = Weight;
    protected readonly Length = Length;


    constructor(
        public formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AircraftWnbEditEnvelopeCoordinateFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            isNewCoordinate: boolean;
            coordinate: WnbLonEnvelopeCoordinate;
            coordinateList: WnbLonEnvelopeCoordinate[];
            lengthUnit: LengthUnit;
            weightUnit: WeightUnit;
        },
    ) {
    }


    ngOnInit() {
        this.initForm(this.data.coordinate);
    }


    ngOnChanges() {
        this.initForm(this.data.coordinate);
    }


    protected getDialogTitle(): string {
        return this.data.isNewCoordinate ? 'Add Coordinate' : 'Edit Coordinate';
    }


    protected getInsertAtIndexText(coord: WnbLonEnvelopeCoordinate): string {
        const index = this.data.coordinateList.indexOf(coord);
        if (index === this.data.coordinateList.length - 1) {
            return 'at the end';
        }

        return 'after '
            + (index + 1).toString() + ') '
            + coord.weight.getValueAndUnit(this.data.weightUnit, 0) + ' / '
            + coord.armCg.getValueAndUnit(this.data.lengthUnit, 3);
    }


    protected getSaveButtonText() {
        return this.data.isNewCoordinate ? 'Add' : 'Update';
    }


    protected onSaveClicked() {
        if (this.editCoordinateForm.valid) {
            const weightValue = parseInt(this.editCoordinateForm.get('weight').value, 10);
            const armValue = parseFloat(this.editCoordinateForm.get('arm').value);
            const newCoordinate = new WnbLonEnvelopeCoordinate(
                isNaN(weightValue) ? null : new Weight(weightValue, this.data.weightUnit),
                isNaN(armValue) ? null : new Length(armValue, this.data.lengthUnit),
            );

            if (this.data.isNewCoordinate) {
                const insertAtIndexValue = parseInt(this.editCoordinateForm.get('insertAtIndex').value, 10);
                this.dialogRef.close({action: 'add', coordinate: newCoordinate, insertAtIndex: insertAtIndexValue});
            } else {
                this.dialogRef.close({
                    action: 'update',
                    oldCoordinate: this.data.coordinate,
                    newCoordinate: newCoordinate
                });
            }
        }
    }


    protected onDeleteClicked() {
        this.dialogRef.close({action: 'delete', coordinate: this.data.coordinate});
    }


    protected onCancelClicked() {
        this.dialogRef.close();
    }


    private initForm(coordinate: WnbLonEnvelopeCoordinate) {
        const insertAtIndexValue = this.data.coordinateList ? this.data.coordinateList.length : 0;
        this.editCoordinateForm = this.formBuilder.group({
            'arm': [
                (coordinate && coordinate.armCg)
                    ? StringnumberHelper.roundToDigits(coordinate.armCg.getValue(this.data.lengthUnit), 3)
                    : '',
                [
                    Validators.required,
                    Validators.min(-99999),
                    Validators.max(99999),
                ]
            ],
            'weight': [
                (coordinate && coordinate.weight)
                    ? StringnumberHelper.roundToDigits(coordinate.weight.getValue(this.data.weightUnit), 0)
                    : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(99999),
                ]
            ],
            'insertAtIndex': [
                insertAtIndexValue,
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(insertAtIndexValue),
                ]
            ]
        });
    }
}
