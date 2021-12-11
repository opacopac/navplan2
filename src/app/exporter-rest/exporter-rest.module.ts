import {NgModule} from '@angular/core';
import {ExporterRestService} from './rest-service/exporter-rest.service';
import {IExporterRepoService} from '../exporter/domain-service/i-exporter-repo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IExporterRepoService, useClass: ExporterRestService }
    ],
})
export class ExporterRestModule {}
