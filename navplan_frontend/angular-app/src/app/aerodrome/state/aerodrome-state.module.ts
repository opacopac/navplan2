import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportReducer} from './ngrx/airport/airport.reducer';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector/reporting-point-sector.reducer';
import {AirportEffects} from './ngrx/airport/airport.effects';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector/reporting-point-sector.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('airportState', airportReducer),
        StoreModule.forFeature('reportingPointSectorState', reportingPointSectorReducer),
        EffectsModule.forFeature([
            AirportEffects,
            ReportingPointSectorEffects
        ]),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AerodromeStateModule {
}
