import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {OlOverlayAirportComponent} from './ol-components/ol-overlay-airport/ol-overlay-airport.component';
import {OlOverlayButtonWebcamComponent} from './ol-components/ol-overlay-button-webcam/ol-overlay-button-webcam.component';
import {OlOverlayGeonameComponent} from './ol-components/ol-overlay-geoname/ol-overlay-geoname.component';
import {OlOverlayMeteogramComponent} from './ol-components/ol-overlay-meteogram/ol-overlay-meteogram.component';
import {OlOverlayNavaidComponent} from './ol-components/ol-overlay-navaid/ol-overlay-navaid.component';
import {OlOverlayReportingpointComponent} from './ol-components/ol-overlay-reportingpoint/ol-overlay-reportingpoint.component';
import {OlOverlayReportingsectorComponent} from './ol-components/ol-overlay-reportingsector/ol-overlay-reportingsector.component';
import {OlOverlayUserpointComponent} from './ol-components/ol-overlay-userpoint/ol-overlay-userpoint.component';
import {OlOverlayWindyiframeComponent} from './ol-components/ol-overlay-windyiframe/ol-overlay-windyiframe.component';
import {SharedModule} from '../common/shared.module';
import {OpenAipModule} from '../open-aip/open-aip.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {NotamModule} from '../notam/notam.module';
import {FlightMapPageComponent} from './ng-components/flight-map-page/flight-map-page.component';
import {BaseMapModule} from '../base-map/base-map.module';
import {SearchModule} from '../search/search.module';
import {LocationModule} from '../location/location.module';
import {FlightTimerModule} from '../flight-timer/flight-timer.module';
import {TrafficModule} from '../traffic/traffic.module';
import {MetarTafModule} from '../metar-taf/metar-taf.module';
import {OlOverlayButtonAddToRouteComponent} from './ol-components/ol-overlay-button-add-to-route/ol-overlay-button-add-to-route.component';
import {OlOverlayButtonEditUserpointComponent} from './ol-components/ol-overlay-button-edit-userpoint/ol-overlay-button-edit-userpoint.component';
import {OlOverlayButtonEditWaypointComponent} from './ol-components/ol-overlay-button-edit-waypoint/ol-overlay-button-edit-waypoint.component';
import {OlOverlayButtonRemoveAlternateComponent} from './ol-components/ol-overlay-button-remove-alternate/ol-overlay-button-remove-alternate.component';
import {OlOverlayButtonRemoveFromRouteComponent} from './ol-components/ol-overlay-button-remove-from-route/ol-overlay-button-remove-from-route.component';
import {OlOverlayButtonSetAlternateComponent} from './ol-components/ol-overlay-button-set-alternate/ol-overlay-button-set-alternate.component';
import {OlOverlayWaypointComponent} from './ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {OlOverlayAirportRunwayTabComponent} from './ol-components/ol-overlay-airport-runway-tab/ol-overlay-airport-runway-tab.component';
import {OlOverlayAirportRadioTabComponent} from './ol-components/ol-overlay-airport-radio-tab/ol-overlay-airport-radio-tab.component';
import {OlOverlayAirportMeteoTabComponent} from './ol-components/ol-overlay-airport-meteo-tab/ol-overlay-airport-meteo-tab.component';
import {OlOverlayAirportNotamTabComponent} from './ol-components/ol-overlay-airport-notam-tab/ol-overlay-airport-notam-tab.component';
import {OlOverlayAirportChartTabComponent} from './ol-components/ol-overlay-airport-chart-tab/ol-overlay-airport-chart-tab.component';
import {OlOverlayButtonListComponent} from './ol-components/ol-overlay-button-list/ol-overlay-button-list.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FlightMapState} from './domain-model/flight-map-state';
import {FlightMapActions} from './ngrx/flight-map.actions';
import {flightMapReducer} from './ngrx/flight-map.reducer';
import {FlightMapEffects} from './ngrx/flight-map.effects';

@NgModule({
    declarations: [
        FlightMapPageComponent,
        OlOverlayAirportComponent,
        OlOverlayButtonWebcamComponent,
        OlOverlayGeonameComponent,
        OlOverlayMeteogramComponent,
        OlOverlayNavaidComponent,
        OlOverlayReportingpointComponent,
        OlOverlayReportingsectorComponent,
        OlOverlayUserpointComponent,
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
        OlOverlayAirportMeteoTabComponent,
        OlOverlayAirportNotamTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayButtonListComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature<FlightMapState, FlightMapActions>('flightMapState', flightMapReducer),
        EffectsModule.forFeature([FlightMapEffects]),
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatListModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        SharedModule,
        BaseMapModule,
        OpenAipModule,
        FlightrouteModule,
        SearchModule,
        LocationModule,
        FlightTimerModule,
        TrafficModule,
        NotamModule,
        MetarTafModule,
    ]
})
export class FlightMapModule {
}
