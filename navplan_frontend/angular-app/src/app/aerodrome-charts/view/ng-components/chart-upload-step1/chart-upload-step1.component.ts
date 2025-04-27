import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
        MiniImageViewerComponent
    ],
    templateUrl: './chart-upload-step1.component.html',
    styleUrls: ['./chart-upload-step1.component.scss']
})
export class ChartUploadStep1Component implements OnInit {
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() isUploading: boolean;
    @Output() fileUploaded = new EventEmitter<ChartUploadParameters>();


    constructor() {
    }


    ngOnInit() {
    }


    protected onFileUploaded(file: File) {
        const chartUploadParameters = new ChartUploadParameters(file); // TODO: add pdf parameters

        this.fileUploaded.emit(chartUploadParameters);
    }
}
