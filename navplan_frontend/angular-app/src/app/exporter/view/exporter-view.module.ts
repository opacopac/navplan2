import {NgModule} from '@angular/core';
import {ExporterDomainModule} from '../domain/exporter-domain.module';
import {ExporterStateModule} from '../state/exporter-state.module';


@NgModule({
    imports: [
        ExporterDomainModule,
        ExporterStateModule,
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class ExporterViewModule {
}
