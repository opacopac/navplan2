import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetarTafService} from './rest/metar-taf.service';
import {OlOverlayButtonMetarTafComponent} from './components/ol-overlay-button-metar-taf/ol-overlay-button-metar-taf.component';
import {OlOverlayMetarTafComponent} from './components/ol-overlay-metar-taf/ol-overlay-metar-taf.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MetarTafEffects} from './ngrx/metar-taf.effects';
import {MetarTafState} from './domain/metar-taf-state';
import {MetarTafActions} from './ngrx/metar-taf.actions';
import {OlMapModule} from '../ol-map/ol-map.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<MetarTafState, MetarTafActions>('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
        SharedModule,
        OlMapModule,
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
