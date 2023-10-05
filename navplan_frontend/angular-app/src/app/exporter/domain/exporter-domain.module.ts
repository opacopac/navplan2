import {NgModule} from '@angular/core';
import {IExporterService} from './service/i-exporter.service';
import {ExporterService} from './service/exporter.service';


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
export class ExporterDomainModule {}
