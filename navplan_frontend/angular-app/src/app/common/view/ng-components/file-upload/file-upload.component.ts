import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UploadedChartInfo} from '../../../../aerodrome-charts/domain/model/uploaded-chart-info';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
    selector: 'app-file-upload',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    @Input() uploadedChartInfo: UploadedChartInfo;
    @Input() autoUpload: boolean;
    @Input() isUploading: false;
    @Output() fileSelected = new EventEmitter<File>();
    @Output() fileUploaded = new EventEmitter<File>();

    protected selectedFile: File | null = null;
    protected isDragOver = false;


    constructor() {
    }


    ngOnInit() {
    }


    protected onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];

            this.selectFile();

            if (this.autoUpload) {
                this.uploadFile();
            }
        }
    }


    protected onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = true;
    }


    protected onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = false;
    }


    protected onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragOver = false;

        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            this.selectedFile = event.dataTransfer.files[0];
            event.dataTransfer.clearData();

            this.selectFile();

            if (this.autoUpload) {
                this.uploadFile();
            }
        }
    }


    protected clearFile() {
        this.selectedFile = null;
    }


    protected selectFile() {
        if (!this.selectedFile) {
            return;
        }

        this.fileSelected.emit(this.selectedFile);
    }


    protected uploadFile() {
        if (!this.selectedFile) {
            return;
        }

        this.fileUploaded.emit(this.selectedFile);
    }
}
