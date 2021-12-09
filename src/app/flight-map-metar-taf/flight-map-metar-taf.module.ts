import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {MetarTafEffects} from './ngrx/metar-taf.effects';
import {MetarTafModule} from '../metar-taf/metar-taf.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
        MetarTafModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class FlightMapMetarTafModule {
}
