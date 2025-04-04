import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportChartReducer} from './ngrx/airport-chart.reducer';
import {AirportChartEffects} from './ngrx/airport-chart.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('airportChartState', airportChartReducer),
        EffectsModule.forFeature([
            AirportChartEffects,
        ]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeChartsStateModule {
}
