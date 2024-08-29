import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeightUnit} from '../../../../geo-physics/domain/model/quantities/weight-unit';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {Weight} from '../../../../geo-physics/domain/model/quantities/weight';
import {WnbEnvelopeAxisType} from '../../../domain/model/wnb-envelope-axis-type';
import {WnbEnvelope} from '../../../domain/model/wnb-envelope';


@Component({
    selector: 'app-aircraft-wnb-edit-envelope-definition-form',
    templateUrl: './aircraft-wnb-edit-envelope-definition-form.component.html',
    styleUrls: ['./aircraft-wnb-edit-envelope-definition-form.component.scss']
})
export class AircraftWnbEditEnvelopeDefinitionFormComponent implements OnInit, OnChanges {
    @Input() isNewEnvelope: boolean;
    @Input() envelope: WnbEnvelope;
    @Input() lengthUnit: LengthUnit;
    @Input() weightUnit: WeightUnit;
    @Output() onCreateClick = new EventEmitter<WnbEnvelope>();
    @Output() onUpdateClick = new EventEmitter<WnbEnvelope>();
    @Output() onDeleteClick = new EventEmitter<WnbEnvelope>();
    @Output() onCancelClick = new EventEmitter<void>();

    protected readonly WnbEnvelopeAxisType = WnbEnvelopeAxisType;
    protected readonly Weight = Weight;
    protected readonly Length = Length;
    protected editForm: FormGroup;


    constructor(public formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm(this.envelope);
    }


    ngOnChanges() {
        this.initForm(this.envelope);
    }


    protected getSaveButtonText() {
        return this.isNewEnvelope ? 'Add' : 'Update';
    }


    protected onSaveClicked() {
        if (this.editForm.valid) {
            const name = this.editForm.get('name').value;
            const axisType = this.editForm.get('axisType').value;
            const envelope = new WnbEnvelope(name, axisType, []);

            if (this.isNewEnvelope) {
                this.onCreateClick.emit(envelope);
            } else {
                this.onUpdateClick.emit(envelope);
            }
        }
    }


    protected onDeleteClicked() {
        this.onDeleteClick.emit(this.envelope);
    }


    protected onCancelClicked() {
        this.onCancelClick.emit();
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
                    : '',
                [
                    Validators.required
                ]
            ]
        });
    }
}
