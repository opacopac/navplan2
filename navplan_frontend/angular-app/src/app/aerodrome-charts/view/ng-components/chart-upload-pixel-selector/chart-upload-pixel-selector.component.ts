import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {XyCoord} from '../../../../geo-physics/domain/model/geometry/xyCoord';


@Component({
    selector: 'app-chart-upload-pixel-selector',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    templateUrl: './chart-upload-pixel-selector.component.html',
    styleUrls: ['./chart-upload-pixel-selector.component.scss']
})
export class ChartUploadPixelSelector implements OnInit, OnChanges {
    protected static readonly FORM_CONTROL_NAME_COORD1 = 'coord1';
    protected static readonly FORM_CONTROL_NAME_COORD2 = 'coord2';

    @Input() controlName: string;
    @Input() isRequired: boolean;
    @Input() isDisabled: boolean;
    @Input() coordinate: XyCoord;
    @Output() coordinateChanged = new EventEmitter<XyCoord>();

    public formGroup: FormGroup;


    protected get coord1ControlName(): string {
        return this.controlName + '_' + ChartUploadPixelSelector.FORM_CONTROL_NAME_COORD1;
    }


    protected get coord2ControlName(): string {
        return this.controlName + '_' + ChartUploadPixelSelector.FORM_CONTROL_NAME_COORD2;
    }


    protected get coord1Control(): FormControl {
        return this.formGroup.get(this.coord1ControlName) as FormControl;
    }


    protected get coord2Control(): FormControl {
        return this.formGroup.get(this.coord2ControlName) as FormControl;
    }


    constructor(
        private parentForm: FormGroupDirective
    ) {
    }


    ngOnInit() {
        this.formGroup = this.parentForm.control;
        this.initForm();
    }


    ngOnChanges() {
        this.updateForm();
    }


    protected onCoordChanged() {
        if (!this.formGroup) {
            return;
        }

        const coord1Str = this.coord1Control?.value;
        const coord2Str = this.coord2Control?.value;

        if (coord1Str >= 0 && coord2Str >= 0) {
            const coord1Value = parseFloat(coord1Str);
            const coord2Value = parseFloat(coord2Str);
            const xyCoord = new XyCoord(coord1Value, coord2Value);

            this.coordinateChanged.emit(xyCoord);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl(this.coord1ControlName, new FormControl(
            this.coordinate ? this.coordinate.x : '',
            this.isRequired ? [Validators.required] : null
        ));

        this.formGroup.addControl(this.coord2ControlName, new FormControl(
            this.coordinate ? this.coordinate.y : '',
            this.isRequired ? [Validators.required] : null
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        // values
        this.coord1Control?.setValue(this.coordinate ? this.coordinate.x : '');
        this.coord2Control?.setValue(this.coordinate ? this.coordinate.y : '');

        // disabled state
        if (this.isDisabled) {
            this.coord1Control?.disable();
            this.coord2Control?.disable();
        } else {
            this.coord1Control?.enable();
            this.coord2Control?.enable();
        }

        // validators
        this.coord1Control?.setValidators(this.isRequired ? [Validators.required] : null);
        this.coord2Control?.setValidators(this.isRequired ? [Validators.required] : null);

        this.coord1Control?.updateValueAndValidity();
        this.coord2Control?.updateValueAndValidity();
    }
}
