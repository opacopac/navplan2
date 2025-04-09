import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {exporterReducer} from './ngrx/exporter.reducer';
import {ExporterEffects} from './ngrx/exporter.effects.service';
import {ExporterDomainModule} from '../domain/exporter-domain.module';
import {ExporterRestModule} from '../rest/exporter-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('exporterState', exporterReducer),
        EffectsModule.forFeature([ExporterEffects]),
        ExporterDomainModule,
        ExporterRestModule
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class ExporterStateModule {
}
