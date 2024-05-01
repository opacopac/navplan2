import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExporterRestModule} from '../rest/exporter-rest.module';
import {ExporterDomainModule} from '../domain/exporter-domain.module';
import {DownloadContainerComponent} from './ng-components/download-container/download-container.component';
import {DownloadDialogComponent} from './ng-components/download-dialog/download-dialog.component';
import {ExporterStateModule} from '../state/exporter-state.module';
import {
    FlightrouteExportButtonsComponent
} from './ng-components/flightroute-export-buttons/flightroute-export-buttons.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        ExporterDomainModule,
        ExporterRestModule,
        ExporterStateModule,
    ],
    declarations: [
        DownloadContainerComponent,
        DownloadDialogComponent,
        FlightrouteExportButtonsComponent

    ],
    exports: [
        DownloadContainerComponent,
        FlightrouteExportButtonsComponent
    ],
    providers: [
    ],
})
export class ExporterViewModule {}
