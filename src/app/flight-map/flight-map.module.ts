import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {OlOverlayMeteogramComponent} from './ol-components/ol-overlay-meteogram/ol-overlay-meteogram.component';
import {OlOverlayWindyiframeComponent} from './ol-components/ol-overlay-windyiframe/ol-overlay-windyiframe.component';
import {SharedModule} from '../common/shared.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {NotamModule} from '../notam/notam.module';
import {FlightMapPageComponent} from './ng-components/flight-map-page/flight-map-page.component';
import {BaseMapModule} from '../base-map/base-map.module';
import {SearchModule} from '../search/search.module';
import {LocationModule} from '../location/location.module';
import {FlightTimerModule} from '../flight-timer/flight-timer.module';
import {TrafficModule} from '../traffic/traffic.module';
import {MetarTafModule} from '../metar-taf/metar-taf.module';
import {OlOverlayButtonAddToRouteComponent} from '../flightroute/ng-components/ol-overlay-button-add-to-route/ol-overlay-button-add-to-route.component';
import {OlOverlayButtonEditUserpointComponent} from './ol-components/ol-overlay-button-edit-userpoint/ol-overlay-button-edit-userpoint.component';
import {OlOverlayButtonEditWaypointComponent} from '../flightroute/ng-components/ol-overlay-button-edit-waypoint/ol-overlay-button-edit-waypoint.component';
import {OlOverlayButtonRemoveAlternateComponent} from '../flightroute/ng-components/ol-overlay-button-remove-alternate/ol-overlay-button-remove-alternate.component';
import {OlOverlayButtonRemoveFromRouteComponent} from '../flightroute/ng-components/ol-overlay-button-remove-from-route/ol-overlay-button-remove-from-route.component';
import {OlOverlayButtonSetAlternateComponent} from '../flightroute/ng-components/ol-overlay-button-set-alternate/ol-overlay-button-set-alternate.component';
import {OlOverlayWaypointComponent} from './ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {OlOverlayAirportRunwayTabComponent} from './ng-components/ol-overlay-airport-runway-tab/ol-overlay-airport-runway-tab.component';
import {OlOverlayAirportRadioTabComponent} from './ng-components/ol-overlay-airport-radio-tab/ol-overlay-airport-radio-tab.component';
import {OlOverlayAirportChartTabComponent} from './ng-components/ol-overlay-airport-chart-tab/ol-overlay-airport-chart-tab.component';
import {MapOverlayWaypointContainerComponent} from '../flightroute/ng-components/map-overlay-waypoint-container/map-overlay-waypoint-container.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightMapReducer} from './ngrx/flight-map/flight-map.reducer';
import {FlightMapEffects} from './ngrx/flight-map/flight-map.effects';
import {AerodromeModule} from '../aerodrome/aerodrome.module';
import {EnrouteModule} from '../enroute/enroute.module';
import {WebcamModule} from '../webcam/webcam.module';
import {OlOverlayAirportMetarTafTabComponent} from './ng-components/ol-overlay-airport-metar-taf-tab/ol-overlay-airport-metar-taf-tab.component';
import {MatIconModule} from '@angular/material/icon';
import {OlMapOverlayComponent} from './ng-components/ol-map-overlay/ol-map-overlay.component';
import {GeonameModule} from '../geoname/geoname.module';
import {UserModule} from '../user/user.module';
import {airportReducer} from './ngrx/airport/airport.reducer';
import {airportChartReducer} from './ngrx/airport-chart/airport-chart.reducer';
import {airportCircuitReducer} from './ngrx/airport-circuit/airport-circuit.reducer';
import {reportingPointSectorReducer} from './ngrx/reporting-point-sector/reporting-point-sector.reducer';
import {AirportEffects} from './ngrx/airport/airport.effects';
import {AirportChartEffects} from './ngrx/airport-chart/airport-chart.effects';
import {AirportCircuitEffects} from './ngrx/airport-circuit/airport-circuit.effects';
import {ReportingPointSectorEffects} from './ngrx/reporting-point-sector/reporting-point-sector.effects';
import {metarTafReducer} from './ngrx/metar-taf/metar-taf.reducer';
import {MetarTafEffects} from './ngrx/metar-taf/metar-taf.effects';
import {navaidReducer} from './ngrx/navaid/navaid.reducer';
import {airspaceReducer} from './ngrx/airspace/airspace.reducer';
import {NavaidEffects} from './ngrx/navaid/navaid.effects';
import {AirspaceEffects} from './ngrx/airspace/airspace.effects';
import {webcamReducer} from './ngrx/webcam/webcam.reducer';
import {WebcamEffects} from './ngrx/webcam/webcam.effects';
import {notamReducer} from './ngrx/notam/notam.reducer';
import {NotamEffects} from './ngrx/notam/notam.effects';
import {MapOverlayNotamTabComponent} from './ng-components/map-overlay-notam-tab/map-overlay-notam-tab.component';
import {OlOverlayAirportHeaderComponent} from './ng-components/ol-overlay-airport-header/ol-overlay-airport-header.component';
import {OlOverlayAirportInfoTabComponent} from './ng-components/ol-overlay-airport-info-tab/ol-overlay-airport-info-tab.component';
import {OlOverlayReportingpointHeaderComponent} from './ng-components/ol-overlay-reportingpoint-header/ol-overlay-reportingpoint-header.component';
import {OlOverlayReportingpointInfoTabComponent} from './ng-components/ol-overlay-reportingpoint-info-tab/ol-overlay-reportingpoint-info-tab.component';
import {OlOverlayReportingsectorHeaderComponent} from './ng-components/ol-overlay-reportingsector-header/ol-overlay-reportingsector-header.component';
import {OlOverlayReportingsectorInfoTabComponent} from './ng-components/ol-overlay-reportingsector-info-tab/ol-overlay-reportingsector-info-tab.component';
import {OlOverlayNavaidHeaderComponent} from './ng-components/ol-overlay-navaid-header/ol-overlay-navaid-header.component';
import {OlOverlayNavaidInfoTabComponent} from './ng-components/ol-overlay-navaid-info-tab/ol-overlay-navaid-info-tab.component';
import {VerticalMapModule} from '../vertical-map/vertical-map.module';

@NgModule({
    declarations: [
        FlightMapPageComponent,
        OlMapOverlayComponent,
        OlOverlayAirportHeaderComponent,
        OlOverlayAirportInfoTabComponent,
        OlOverlayReportingpointHeaderComponent,
        OlOverlayReportingpointInfoTabComponent,
        OlOverlayReportingsectorHeaderComponent,
        OlOverlayReportingsectorInfoTabComponent,
        OlOverlayNavaidHeaderComponent,
        OlOverlayNavaidInfoTabComponent,
        OlOverlayMeteogramComponent,
        OlOverlayWindyiframeComponent,
        OlOverlayButtonAddToRouteComponent,
        OlOverlayButtonEditUserpointComponent,
        OlOverlayButtonEditWaypointComponent,
        OlOverlayButtonRemoveAlternateComponent,
        OlOverlayButtonRemoveFromRouteComponent,
        OlOverlayButtonSetAlternateComponent,
        OlOverlayWaypointComponent,
        OlOverlayAirportRunwayTabComponent,
        OlOverlayAirportRadioTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayAirportMetarTafTabComponent,
        MapOverlayWaypointContainerComponent,
        MapOverlayNotamTabComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('flightMapState', flightMapReducer),
        EffectsModule.forFeature([FlightMapEffects]),
        StoreModule.forFeature('airportState', airportReducer),
        StoreModule.forFeature('airportChartState', airportChartReducer),
        StoreModule.forFeature('airportCircuitState', airportCircuitReducer),
        StoreModule.forFeature('reportingPointSectorState', reportingPointSectorReducer),
        EffectsModule.forFeature([AirportEffects, AirportChartEffects, AirportCircuitEffects, ReportingPointSectorEffects]),
        StoreModule.forFeature('navaidState', navaidReducer),
        StoreModule.forFeature('airspaceState', airspaceReducer),
        EffectsModule.forFeature([NavaidEffects, AirspaceEffects]),
        StoreModule.forFeature('metarTafState', metarTafReducer),
        EffectsModule.forFeature([MetarTafEffects]),
        StoreModule.forFeature('notamState', notamReducer),
        EffectsModule.forFeature([NotamEffects]),
        StoreModule.forFeature('webcamState', webcamReducer),
        EffectsModule.forFeature([WebcamEffects]),
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        SharedModule,
        BaseMapModule,
        FlightrouteModule,
        SearchModule,
        LocationModule,
        FlightTimerModule,
        TrafficModule,
        NotamModule,
        MetarTafModule,
        AerodromeModule,
        EnrouteModule,
        GeonameModule,
        WebcamModule,
        UserModule,
        VerticalMapModule
    ]
})
export class FlightMapModule {
}
