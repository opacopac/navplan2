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
import {MatRadioModule} from '@angular/material/radio';
import {ChartRegistrationType} from '../../../domain/model/chart-registration-type';


@Component({
    selector: 'app-chart-upload-registration-type-selector',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatRadioModule
    ],
    templateUrl: './chart-upload-registration-type-selector.component.html',
    styleUrls: ['./chart-upload-registration-type-selector.component.scss']
})
export class ChartUploadRegistrationTypeSelectorComponent implements OnInit, OnChanges {
    @Input() chartRegistrationType: ChartRegistrationType;
    @Output() chartRegistrationTypeChanged = new EventEmitter<ChartRegistrationType>();

    protected formGroup: FormGroup;
    protected readonly ChartRegistrationType = ChartRegistrationType;


    protected get chartRegistrationTypeControl(): FormControl {
        return this.formGroup.get('chartRegistrationType') as FormControl;
    }


    constructor(private parentForm: FormGroupDirective) {
    }


    ngOnInit() {
        this.formGroup = this.parentForm.control;
        this.initForm();
    }


    ngOnChanges() {
        this.updateForm();
    }


    protected onChartRegistrationTypeChanged() {
        const chartRegistrationType = this.chartRegistrationTypeControl?.value;
        if (chartRegistrationType !== null) {
            this.chartRegistrationTypeChanged.emit(chartRegistrationType);
        }
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('chartRegistrationType', new FormControl(
            this.chartRegistrationType,
            [Validators.required]
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        if (this.chartRegistrationType !== undefined) {
            this.chartRegistrationTypeControl?.setValue(this.chartRegistrationType);
        }
    }
}
