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
import {OlOverlayAirportHeaderComponent} from './ng-components/ol-overlay-airport-header/ol-overlay-airport-header.component';
import {OlOverlayAirportInfoTabComponent} from './ng-components/ol-overlay-airport-info-tab/ol-overlay-airport-info-tab.component';
import {OlOverlayReportingpointHeaderComponent} from './ng-components/ol-overlay-reportingpoint-header/ol-overlay-reportingpoint-header.component';
import {OlOverlayReportingpointInfoTabComponent} from './ng-components/ol-overlay-reportingpoint-info-tab/ol-overlay-reportingpoint-info-tab.component';
import {OlOverlayReportingsectorHeaderComponent} from './ng-components/ol-overlay-reportingsector-header/ol-overlay-reportingsector-header.component';
import {OlOverlayReportingsectorInfoTabComponent} from './ng-components/ol-overlay-reportingsector-info-tab/ol-overlay-reportingsector-info-tab.component';


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
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent
    ],
    exports: [
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent
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
