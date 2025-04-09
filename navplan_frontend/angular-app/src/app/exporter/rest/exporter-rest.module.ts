import {NgModule} from '@angular/core';
import {ExporterRestService} from './service/exporter-rest.service';
import {IExporterRepoService} from '../domain/service/i-exporter-repo.service';
import {ExporterDomainModule} from '../domain/exporter-domain.module';


@NgModule({
    imports: [
        ExporterDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IExporterRepoService, useClass: ExporterRestService}
    ],
})
export class ExporterRestModule {
}
