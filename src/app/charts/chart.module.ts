import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../common/shared.module';
import {chartReducer} from './ngrx/chart.reducer';
import {ChartState} from './ngrx/chart-state';
import {ChartActions} from './ngrx/chart.actions';
import {ChartEffects} from './ngrx/chart.effects';
import {ChartService} from './rest-service/chart.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<ChartState, ChartActions>('chartState', chartReducer),
        EffectsModule.forFeature([ChartEffects]),
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        ChartService
    ]
})
export class ChartModule {}
