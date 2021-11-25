import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {IExporterService} from './domain-service/i-exporter-service';
import {ExporterEffects} from './ngrx/exporter.effects.service';
import {exporterReducer} from './ngrx/exporter.reducer';
import {ExporterRestService} from './rest-service/exporter-rest.service';
import {DownloadContainerComponent} from './ng-components/download-container/download-container.component';
import {DownloadDialogComponent} from './ng-components/download-dialog/download-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('exporterState', exporterReducer),
        EffectsModule.forFeature([ExporterEffects]),
        SharedModule,
    ],
    declarations: [
        DownloadContainerComponent,
        DownloadDialogComponent
    ],
    exports: [
        DownloadContainerComponent
    ],
    providers: [
        { provide: IExporterService, useClass: ExporterRestService }
    ],
    entryComponents: [
    ],
})
export class ExporterModule {}
