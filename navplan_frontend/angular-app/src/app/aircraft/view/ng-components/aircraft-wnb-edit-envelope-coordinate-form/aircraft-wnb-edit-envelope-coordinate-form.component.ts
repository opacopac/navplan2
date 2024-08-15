import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {StringnumberHelper} from '../../../../system/domain/service/stringnumber/stringnumber-helper';
import {WnbEnvelopeCoordinate} from '../../../domain/model/wnb-envelope-coordinate';


@Component({
    selector: 'app-aircraft-wnb-edit-envelope-coordinate-form',
    templateUrl: './aircraft-wnb-edit-envelope-coordinate-form.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope-coordinate-form.component.scss']
})
export class AircraftWnbEditEnvelopeCoordinateFormComponent implements OnInit, OnChanges {
    @Input() coordinate: WnbEnvelopeCoordinate;
    @Input() lengthUnit: LengthUnit;
    @Input() weightUnit: WeightUnit;
    @Output() onSaveClick = new EventEmitter<WnbEnvelopeCoordinate>();
    @Output() onCancelClick = new EventEmitter<null>();

    protected editCoordinateForm: FormGroup;
    protected readonly Weight = Weight;
    protected readonly Length = Length;


    constructor(public formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm(this.coordinate);
    }


    ngOnChanges() {
        this.initForm(this.coordinate);
    }


    protected getSaveButtonText() {
        return this.coordinate ? 'Apply' : 'Add';
    }


    protected onSaveClicked() {
        if (this.editCoordinateForm.valid) {
            const weightValue = parseInt(this.editCoordinateForm.get('weight').value, 10);
            const armValue = parseFloat(this.editCoordinateForm.get('arm').value);
            const envCoordinate = new WnbEnvelopeCoordinate(
                isNaN(weightValue) ? null : new Weight(weightValue, this.weightUnit),
                isNaN(armValue) ? null : new Length(armValue, this.lengthUnit),
            );

            this.onSaveClick.emit(envCoordinate);
        }
    }


    protected onCancelClicked() {
        this.onCancelClick.emit();
    }


    private initForm(coordinate: WnbEnvelopeCoordinate) {
        this.editCoordinateForm = this.formBuilder.group({
            'arm': [
                (coordinate && coordinate.armCg)
                    ? StringnumberHelper.roundToDigits(coordinate.armCg.getValue(this.lengthUnit), 3)
                    : '',
                [
                    Validators.required,
                    Validators.min(-99999),
                    Validators.max(99999),
                ]
            ],
            'weight': [
                (coordinate && coordinate.weight)
                    ? StringnumberHelper.roundToDigits(coordinate.weight.getValue(this.weightUnit), 0)
                    : '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(99999),
                ]
            ],
        });
    }
}
