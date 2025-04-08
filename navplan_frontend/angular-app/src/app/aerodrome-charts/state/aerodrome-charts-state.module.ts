import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportChartReducer} from './ngrx/airport-chart.reducer';
import {AirportChartEffects} from './ngrx/airport-chart.effects';
import {AerodromeChartsDomainModule} from '../domain/aerodrome-charts-domain.module';
import {AerodromeChartsRestModule} from '../rest/aerodrome-charts-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('airportChartState', airportChartReducer),
        EffectsModule.forFeature([AirportChartEffects]),
        AerodromeChartsDomainModule,
        AerodromeChartsRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeChartsStateModule {
}
