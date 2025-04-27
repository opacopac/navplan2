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
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PdfParameters} from '../../../domain/model/pdf-parameters';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {ButtonColor} from '../../../../common/view/model/button-color';


@Component({
    selector: 'app-chart-upload-step1',
    standalone: true,
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
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() isUploading: boolean;
    @Input() selectedChartFile: File;
    @Output() fileSelected = new EventEmitter<File>();
    @Output() fileUploaded = new EventEmitter<ChartUploadParameters>();

    protected readonly ButtonColor = ButtonColor;
    protected uploadStep1Form: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnChanges() {
        this.initForm();
    }


    protected onFileSelected(file: File) {
        this.fileSelected.emit(file);
    }


    protected onFileUploaded(file: File) {
        const pdfParameters = this.getPdfParameters();
        const chartUploadParameters = new ChartUploadParameters(file, pdfParameters);

        this.fileUploaded.emit(chartUploadParameters);
    }



    protected onPdfParamtersChanged() {
        const pdfParameters = this.getPdfParameters();
        const chartUploadParameters = new ChartUploadParameters(this.selectedChartFile, pdfParameters);

        this.fileUploaded.emit(chartUploadParameters);
    }


    private initForm() {
        this.uploadStep1Form = this.formBuilder.group({
            'chartName': [
                this.uploadedChartInfo
                    ? this.uploadedChartInfo.nameproposal
                    : '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100),
                ]
            ],
            'pdfPage': [
                PdfParameters.DEFAULT_PAGE + 1,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(99),
                ]
            ],
            'pdfRotationDeg': [
                PdfParameters.DEFAULT_ROTATION_DEG,
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(360),
                ]
            ],
            'pdfDpi': [
                PdfParameters.DEFAULT_DPI,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(600),
                ]
            ],
        });
    }


    private getPdfParameters(): PdfParameters {
        return new PdfParameters(
            this.uploadStep1Form.get('pdfPage').value - 1,
            this.uploadStep1Form.get('pdfRotationDeg').value,
            this.uploadStep1Form.get('pdfDpi').value
        );
    }
}

