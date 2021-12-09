import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {OlOverlayAirportHeaderComponent} from './ng-components/ol-overlay-airport-header/ol-overlay-airport-header.component';
import {OlOverlayAirportChartTabComponent} from './ng-components/ol-overlay-airport-chart-tab/ol-overlay-airport-chart-tab.component';
import {OlOverlayAirportInfoTabComponent} from './ng-components/ol-overlay-airport-info-tab/ol-overlay-airport-info-tab.component';
import {OlOverlayAirportRunwayTabComponent} from './ng-components/ol-overlay-airport-runway-tab/ol-overlay-airport-runway-tab.component';
import {OlOverlayAirportRadioTabComponent} from './ng-components/ol-overlay-airport-radio-tab/ol-overlay-airport-radio-tab.component';
import {OlOverlayAirportMetarTafTabComponent} from './ng-components/ol-overlay-airport-metar-taf-tab/ol-overlay-airport-metar-taf-tab.component';
import {OlOverlayReportingpointHeaderComponent} from './ng-components/ol-overlay-reportingpoint-header/ol-overlay-reportingpoint-header.component';
import {OlOverlayReportingpointInfoTabComponent} from './ng-components/ol-overlay-reportingpoint-info-tab/ol-overlay-reportingpoint-info-tab.component';
import {OlOverlayReportingsectorHeaderComponent} from './ng-components/ol-overlay-reportingsector-header/ol-overlay-reportingsector-header.component';
import {airportReducer} from './ngrx/airport/airport.reducer';
import {airportChartReducer} from './ngrx/airport-chart/airport-chart.reducer';
import {airportCircuitReducer} from './ngrx/airport-circuit/airport-circuit.reducer';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector/reporting-point-sector.reducer';
import {AirportEffects} from './ngrx/airport/airport.effects';
import {AirportChartEffects} from './ngrx/airport-chart/airport-chart.effects';
import {AirportCircuitEffects} from './ngrx/airport-circuit/airport-circuit.effects';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector/reporting-point-sector.effects';
import {OlOverlayReportingsectorInfoTabComponent} from './ng-components/ol-overlay-reportingsector-info-tab/ol-overlay-reportingsector-info-tab.component';
import {AerodromeModule} from '../aerodrome/aerodrome.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StoreModule.forFeature('airportState', airportReducer),
        StoreModule.forFeature('airportChartState', airportChartReducer),
        StoreModule.forFeature('airportCircuitState', airportCircuitReducer),
        StoreModule.forFeature('reportingPointSectorState', reportingPointSectorReducer),
        EffectsModule.forFeature([AirportEffects, AirportChartEffects, AirportCircuitEffects, ReportingPointSectorEffects]),
        AerodromeModule,
    ],
    declarations: [
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayAirportRunwayTabComponent,
        OlOverlayAirportRadioTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayAirportMetarTafTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent,
    ],
    exports: [
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayAirportRunwayTabComponent,
        OlOverlayAirportRadioTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayAirportMetarTafTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent,
    ],
    providers: [
    ]
})
export class FlightMapAerodromeModule {}
