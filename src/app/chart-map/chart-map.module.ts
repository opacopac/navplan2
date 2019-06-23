import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {OlMapModule} from '../ol-map/ol-map.module';
import {OpenAipModule} from '../open-aip/open-aip.module';
import {ChartMapPageComponent} from './components/chart-map-page/chart-map-page.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ChartMapState} from './chart-map-state';
import {ChartMapActions} from './chart-map.actions';
import {ChartMapEffects} from './chart-map.effects';
import {chartMapReducer} from './chart-map.reducer';


@NgModule({
    declarations: [ChartMapPageComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature<ChartMapState, ChartMapActions>('chartMapState', chartMapReducer),
        EffectsModule.forFeature([ChartMapEffects]),
        SharedModule,
        OlMapModule,
        OpenAipModule
    ]
})
export class ChartMapModule {
}
