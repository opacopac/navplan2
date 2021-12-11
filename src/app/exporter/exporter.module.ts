import {NgModule} from '@angular/core';
import {IExporterService} from './domain-service/i-exporter.service';
import {ExporterService} from './domain-service/exporter.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IExporterService, useClass: ExporterService }
    ],
})
export class ExporterModule {}
