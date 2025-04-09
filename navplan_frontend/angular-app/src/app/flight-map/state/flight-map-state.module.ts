import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightMapReducer} from './ngrx/flight-map.reducer';
import {FlightMapEffects} from './ngrx/flight-map.effects';
import {FlightMapStateService} from './ngrx/flight-map-state.service';
import {LocationStateModule} from '../../location/location-state/location-state.module';
import {AerodromeStateModule} from '../../aerodrome/state/aerodrome-state.module';
import {AerodromeChartsStateModule} from '../../aerodrome-charts/state/aerodrome-charts-state.module';
import {AerodromeCircuitsStateModule} from '../../aerodrome-circuits/state/aerodrome-circuits-state.module';
import {AerodromeReportingStateModule} from '../../aerodrome-reporting/state/aerodrome-reporting-state.module';
import {AirspaceStateModule} from '../../airspace/state/airspace-state.module';
import {BaseMapStateModule} from '../../base-map/state/base-map-state.module';
import {FlightTimerStateModule} from '../../flight-timer/state/flight-timer-state.module';
import {MetarTafStateModule} from '../../metar-taf/state/metar-taf-state.module';


@NgModule({
    imports: [
        StoreModule.forFeature('flightMapState', flightMapReducer),
        EffectsModule.forFeature([FlightMapEffects]),
        AerodromeStateModule,
        AerodromeChartsStateModule,
        AerodromeCircuitsStateModule,
        AerodromeReportingStateModule,
        AirspaceStateModule,
        BaseMapStateModule,
        FlightTimerStateModule,
        LocationStateModule,
        MetarTafStateModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        FlightMapStateService,
    ]
})
export class FlightMapStateModule {
}
