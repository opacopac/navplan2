import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {AirportRestService} from './rest-service/airport-rest.service';
import {AirportService} from './domain-service/airport.service';
import {AirportCircuitRestService} from './rest-service/airport-circuit-rest.service';
import {AirportChartRestService} from './rest-service/airport-chart-rest.service';
import {ReportingPointRestService} from './rest-service/reporting-point-rest.service';
import {AirportCircuitService} from './domain-service/airport-circuit.service';
import {AirportChartService} from './domain-service/airport-chart.service';
import {ReportingPointService} from './domain-service/reporting-point.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {airportReducer} from './ngrx/airport.reducer';
import {AirportEffects} from './ngrx/airport.effects';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector.effects';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector.reducer';
import {AirportCircuitEffects} from './ngrx/airport-circuit.effects';
import {airportCircuitReducer} from './ngrx/airport-circuit.reducer';
import {airportChartReducer} from './ngrx/airport-chart.reducer';
import {AirportChartEffects} from './ngrx/airport-chart.effects';


@NgModule({
    imports: [
        CommonModule,
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
        SharedModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        AirportService,
        AirportRestService,
        AirportCircuitService,
        AirportCircuitRestService,
        AirportChartService,
        AirportChartRestService,
        ReportingPointService,
        ReportingPointRestService
    ]
})
export class AerodromeModule {}
