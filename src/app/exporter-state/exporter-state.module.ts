import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {exporterReducer} from './ngrx/exporter.reducer';
import {ExporterEffects} from './ngrx/exporter.effects.service';


@NgModule({
    imports: [
        StoreModule.forFeature('exporterState', exporterReducer),
        EffectsModule.forFeature([ExporterEffects]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ],
})
export class ExporterStateModule {}
