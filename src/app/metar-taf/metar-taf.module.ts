import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetarTafRepo} from './rest-service/metar-taf-repo.service';
import {OlOverlayButtonMetarTafComponent} from './ng-components/ol-overlay-button-metar-taf/ol-overlay-button-metar-taf.component';
import {OlOverlayMetarTafComponent} from './ng-components/ol-overlay-metar-taf/ol-overlay-metar-taf.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {metarTafReducer} from './ngrx/metar-taf.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MetarTafEffects} from './ngrx/metar-taf.effects';
import {MetarTafState} from './domain-model/metar-taf-state';
import {MetarTafActions} from './ngrx/metar-taf.actions';
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
        MetarTafRepo
    ]
})
export class MetarTafModule {
}
