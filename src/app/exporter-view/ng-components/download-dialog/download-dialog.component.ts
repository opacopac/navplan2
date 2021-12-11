import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment';
import {ExporterState} from '../../../exporter/domain-model/exporter-state';


@Component({
    selector: 'app-download-dialog',
    templateUrl: './download-dialog.component.html',
    styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent implements OnInit, OnDestroy {
    public filename: string;
    public mimeType: string;
    public downloadUrl: string;


    constructor(@Inject(MAT_DIALOG_DATA) public data: ExporterState) {
        this.filename = data.exportedFile.filename;
        this.mimeType = data.exportedFile.mimeType;
        this.downloadUrl = environment.exportBaseUrl + data.exportedFile.relUrl;
    }


    ngOnInit() {
    }


    ngOnDestroy() {
    }
}
