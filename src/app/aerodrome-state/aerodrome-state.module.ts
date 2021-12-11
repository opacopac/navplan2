import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportReducer} from './ngrx/airport/airport.reducer';
import {airportChartReducer} from './ngrx/airport-chart/airport-chart.reducer';
import {airportCircuitReducer} from './ngrx/airport-circuit/airport-circuit.reducer';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector/reporting-point-sector.reducer';
import {AirportEffects} from './ngrx/airport/airport.effects';
import {AirportChartEffects} from './ngrx/airport-chart/airport-chart.effects';
import {AirportCircuitEffects} from './ngrx/airport-circuit/airport-circuit.effects';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector/reporting-point-sector.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('airportState', airportReducer),
        StoreModule.forFeature('airportChartState', airportChartReducer),
        StoreModule.forFeature('airportCircuitState', airportCircuitReducer),
        StoreModule.forFeature('reportingPointSectorState', reportingPointSectorReducer),
        EffectsModule.forFeature([
            AirportEffects,
            AirportChartEffects,
            AirportCircuitEffects,
            ReportingPointSectorEffects
        ]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class AerodromeStateModule {}
