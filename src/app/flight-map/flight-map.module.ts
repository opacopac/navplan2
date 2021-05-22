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
import {OlOverlayButtonAddToRouteComponent} from './ol-components/ol-overlay-button-add-to-route/ol-overlay-button-add-to-route.component';
import {OlOverlayButtonEditUserpointComponent} from './ol-components/ol-overlay-button-edit-userpoint/ol-overlay-button-edit-userpoint.component';
import {OlOverlayButtonEditWaypointComponent} from './ol-components/ol-overlay-button-edit-waypoint/ol-overlay-button-edit-waypoint.component';
import {OlOverlayButtonRemoveAlternateComponent} from './ol-components/ol-overlay-button-remove-alternate/ol-overlay-button-remove-alternate.component';
import {OlOverlayButtonRemoveFromRouteComponent} from './ol-components/ol-overlay-button-remove-from-route/ol-overlay-button-remove-from-route.component';
import {OlOverlayButtonSetAlternateComponent} from './ol-components/ol-overlay-button-set-alternate/ol-overlay-button-set-alternate.component';
import {OlOverlayWaypointComponent} from './ol-components/ol-overlay-waypoint/ol-overlay-waypoint.component';
import {OlOverlayAirportRunwayTabComponent} from '../aerodrome/ng-components/ol-overlay-airport-runway-tab/ol-overlay-airport-runway-tab.component';
import {OlOverlayAirportRadioTabComponent} from '../aerodrome/ng-components/ol-overlay-airport-radio-tab/ol-overlay-airport-radio-tab.component';
import {OlOverlayAirportNotamTabComponent} from './ol-components/ol-overlay-airport-notam-tab/ol-overlay-airport-notam-tab.component';
import {OlOverlayAirportChartTabComponent} from '../aerodrome/ng-components/ol-overlay-airport-chart-tab/ol-overlay-airport-chart-tab.component';
import {OlOverlayButtonListComponent} from './ol-components/ol-overlay-button-list/ol-overlay-button-list.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {flightMapReducer} from './ngrx/flight-map.reducer';
import {FlightMapEffects} from './ngrx/flight-map.effects';
import {AerodromeModule} from '../aerodrome/aerodrome.module';
import {EnrouteModule} from '../enroute/enroute.module';
import {WebcamModule} from '../webcam/webcam.module';
import {OlOverlayAirportMetarTafTabComponent} from '../aerodrome/ng-components/ol-overlay-airport-metar-taf-tab/ol-overlay-airport-metar-taf-tab.component';
import {MatIconModule} from '@angular/material/icon';
import {OlMapOverlayComponent} from './ng-components/ol-map-overlay/ol-map-overlay.component';
import {GeonameModule} from '../geoname/geoname.module';
import {UserModule} from '../user/user.module';

@NgModule({
    declarations: [
        FlightMapPageComponent,
        OlMapOverlayComponent,
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
        OlOverlayAirportNotamTabComponent,
        OlOverlayAirportChartTabComponent,
        OlOverlayButtonListComponent,
        OlOverlayAirportMetarTafTabComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('flightMapState', flightMapReducer),
        EffectsModule.forFeature([FlightMapEffects]),
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
        UserModule
    ]
})
export class FlightMapModule {
}
