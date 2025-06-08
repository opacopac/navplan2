import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UploadedChartInfo} from '../../../domain/model/uploaded-chart-info';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FileUploadComponent} from '../../../../common/view/ng-components/file-upload/file-upload.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    MiniImageViewerComponent
} from '../../../../common/view/ng-components/mini-image-viewer/mini-image-viewer.component';
import {ChartUploadParameters} from '../../../domain/model/chart-upload-parameters';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {PdfParameters} from '../../../domain/model/pdf-parameters';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {Angle} from '../../../../geo-physics/domain/model/quantities/angle';
import {Airport} from '../../../../aerodrome/domain/model/airport';


@Component({
    selector: 'app-chart-upload-step1',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        FileUploadComponent,
        MatFormFieldModule,
        MatInputModule,
        MiniImageViewerComponent,
        ReactiveFormsModule,
        IconButtonComponent
    ],
    templateUrl: './chart-upload-step1.component.html',
    styleUrls: ['./chart-upload-step1.component.scss']
})
export class ChartUploadStep1Component implements OnInit, OnChanges {
    @Input() selectedAirport: Airport;
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() isUploading: boolean;
    @Input() chartName: string;
    @Input() selectedChartFile: File;
    @Input() pdfParameters: PdfParameters;
    @Output() fileSelected = new EventEmitter<File>();
    @Output() fileUploaded = new EventEmitter<ChartUploadParameters>();
    @Output() chartNameChanged = new EventEmitter<string>();

    protected formGroup: FormGroup;
    protected readonly ButtonColor = ButtonColor;


    protected get chartNameControl(): FormControl {
        return this.formGroup.get('chartName') as FormControl;
    }


    protected get pdfPageControl(): FormControl {
        return this.formGroup.get('pdfPage') as FormControl;
    }


    protected get pdfRotationDegControl(): FormControl {
        return this.formGroup.get('pdfRotationDeg') as FormControl;
    }


    protected get pdfDpiControl(): FormControl {
        return this.formGroup.get('pdfDpi') as FormControl;
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


    protected onFileSelected(file: File) {
        this.fileSelected.emit(file);
    }


    protected onFileUploaded(file: File) {
        const pdfParameters = this.getPdfParametersFromForm();
        const chartUploadParameters = new ChartUploadParameters(file, pdfParameters);

        this.fileUploaded.emit(chartUploadParameters);
    }


    protected onChartNameChanged() {
        const chartName = this.chartNameControl?.value.trim();
        if (chartName && chartName.length > 0) {
            this.chartNameChanged.emit(chartName);
        }
    }


    protected onPdfParamtersChanged() {
        const pdfParameters = this.getPdfParametersFromForm();
        const chartUploadParameters = new ChartUploadParameters(this.selectedChartFile, pdfParameters);

        this.fileUploaded.emit(chartUploadParameters);
    }


    private initForm() {
        if (!this.formGroup) {
            return;
        }

        this.formGroup.addControl('chartName', new FormControl(
            this.chartName ?? '',
            [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(100),
            ]
        ));
        this.formGroup.addControl('pdfPage', new FormControl(
            PdfParameters.DEFAULT_PAGE + 1,
            [
                Validators.required,
                Validators.min(1),
                Validators.max(99),
            ]
        ));
        this.formGroup.addControl('pdfRotationDeg', new FormControl(
            PdfParameters.DEFAULT_ROTATION_DEG,
            [
                Validators.required,
                Validators.min(0),
                Validators.max(360),
            ]
        ));

        this.formGroup.addControl('pdfDpi', new FormControl(
            PdfParameters.DEFAULT_DPI,
            [
                Validators.required,
                Validators.min(1),
                Validators.max(600),
            ]
        ));
    }


    private updateForm() {
        if (!this.formGroup) {
            return;
        }

        this.chartNameControl?.setValue(this.chartName ?? '');
        this.pdfPageControl?.setValue(
            this.pdfParameters
                ? this.pdfParameters.page + 1
                : PdfParameters.DEFAULT_PAGE + 1
        );
        this.pdfRotationDegControl?.setValue(
            this.pdfParameters && this.pdfParameters.rotation
                ? this.pdfParameters.rotation.deg
                : PdfParameters.DEFAULT_ROTATION_DEG
        );
        this.pdfDpiControl?.setValue(
            this.pdfParameters
                ? this.pdfParameters.dpi
                : PdfParameters.DEFAULT_DPI
        );
    }


    protected getPdfParametersFromForm(): PdfParameters {
        return new PdfParameters(
            this.pdfPageControl.value - 1,
            Angle.fromDeg(this.pdfRotationDegControl.value),
            this.pdfDpiControl.value
        );
    }
}
