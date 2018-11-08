import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetarTafService} from './services/metar-taf.service';
import {OlOverlayButtonMetarTafComponent} from './components/ol-overlay-button-metar-taf/ol-overlay-button-metar-taf.component';
import {OlOverlayMetarTafComponent} from './components/ol-overlay-metar-taf/ol-overlay-metar-taf.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {metarTafReducer} from './metar-taf.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MetarTafEffects} from './metar-taf.effects';
import {MetarTafState} from './metar-taf-state';
import {MetarTafActions} from './metar-taf.actions';
import {BaseMapModule} from '../base-map/base-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<MetarTafState, MetarTafActions>('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
        SharedModule,
        BaseMapModule,
    ],
    declarations: [
        OlOverlayButtonMetarTafComponent,
        OlOverlayMetarTafComponent
    ],
    exports: [
        OlOverlayButtonMetarTafComponent,
        OlOverlayMetarTafComponent
    ],
    providers: [
        MetarTafService
    ]
})
export class MetarTafModule {
}
