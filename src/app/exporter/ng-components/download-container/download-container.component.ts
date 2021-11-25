import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {getExporterState} from '../../ngrx/exporter.selectors';
import {MatDialog} from '@angular/material/dialog';
import {DownloadDialogComponent} from '../download-dialog/download-dialog.component';
import {ExporterState} from '../../domain-model/exporter-state';


@Component({
    selector: 'app-download-container',
    templateUrl: './download-container.component.html',
    styleUrls: ['./download-container.component.css']
})
export class DownloadContainerComponent implements OnInit, OnDestroy {
    public readonly exporterState$ = this.appStore.pipe(select(getExporterState));
    private readonly filenameSubscription: Subscription;


    constructor(
        private appStore: Store<any>,
        public dialog: MatDialog
    ) {
        this.filenameSubscription = this.exporterState$.subscribe(state => {
            if (state.filename) {
                this.openDialog(state);
            }
        });
    }


    ngOnInit() {
    }


    ngOnDestroy() {
        this.filenameSubscription.unsubscribe();
    }


    private openDialog(state: ExporterState) {
        this.dialog.open(DownloadDialogComponent, {
            data: {
                filename: state.filename,
                mimeType: state.mimeType,
                relUrl: state.relUrl
            }
        });
    }
}
