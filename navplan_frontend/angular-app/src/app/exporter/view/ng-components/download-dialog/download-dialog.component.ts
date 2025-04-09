import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {environment} from '../../../../../environments/environment';
import {ExporterState} from '../../../state/state-model/exporter-state';
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-download-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './download-dialog.component.html',
    styleUrls: ['./download-dialog.component.scss']
})
export class DownloadDialogComponent implements OnInit {
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
}
