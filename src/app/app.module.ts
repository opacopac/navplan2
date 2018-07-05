import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import {TracksComponent} from './components/tracks/tracks.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AboutComponent} from './components/about/about.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './user/components/login/login.component';
import {MessageComponent} from './shared/components/message/message.component';
import {UserprofileComponent} from './user/components/userprofile/userprofile.component';
import {ForgotpwComponent} from './user/components/forgotpw/forgotpw.component';
import {ZoomButtonsComponent} from './components/buttons/zoom-buttons/zoom-buttons.component';
import {LocationButtonComponent} from './components/buttons/location-button/location-button.component';
import {MapOverlayMetarTafComponent} from './components/map-overlay/map-overlay-metar-taf/map-overlay-metar-taf.component';
import {MapOverlayTrafficComponent} from './components/map-overlay/map-overlay-traffic/map-overlay-traffic.component';
import {MapOverlayNotamComponent} from './components/map-overlay/map-overlay-notam/map-overlay-notam.component';
import {MapOverlayAirportComponent} from './components/map-overlay/map-overlay-airport/map-overlay-airport.component';
import {MapOverlayNavaidComponent} from './components/map-overlay/map-overlay-navaid/map-overlay-navaid.component';
import {MapOverlayReportingpointComponent} from './components/map-overlay/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import {MapOverlayReportingsectorComponent} from './components/map-overlay/map-overlay-reportingsector/map-overlay-reportingsector.component';
import {MapOverlayUserpointComponent} from './components/map-overlay/map-overlay-userpoint/map-overlay-userpoint.component';
import {MapOverlayButtonMetarTafComponent} from './components/map-overlay/map-overlay-button-metar-taf/map-overlay-button-metar-taf.component';
import {MapOverlayButtonAddToRouteComponent} from './components/map-overlay/map-overlay-button-add-to-route/map-overlay-button-add-to-route.component';
import {MapOverlayButtonEditWaypointComponent} from './components/map-overlay/map-overlay-button-edit-waypoint/map-overlay-button-edit-waypoint.component';
import {MapOverlayButtonRemoveFromRouteComponent} from './components/map-overlay/map-overlay-button-remove-from-route/map-overlay-button-remove-from-route.component';
import {MapOverlayButtonSetAlternateComponent} from './components/map-overlay/map-overlay-button-set-alternate/map-overlay-button-set-alternate.component';
import {MapOverlayButtonNotamComponent} from './components/map-overlay/map-overlay-button-notam/map-overlay-button-notam.component';
import {MapOverlayButtonMeteogramComponent} from './components/map-overlay/map-overlay-button-meteogram/map-overlay-button-meteogram.component';
import {MapOverlayButtonWebcamComponent} from './components/map-overlay/map-overlay-button-webcam/map-overlay-button-webcam.component';
import {MapOverlayButtonEditUserpointComponent} from './components/map-overlay/map-overlay-button-edit-userpoint/map-overlay-button-edit-userpoint.component';
import {MapOverlayMeteogramComponent} from './components/map-overlay/map-overlay-meteogram/map-overlay-meteogram.component';
import {FlighttimerComponent} from './components/flighttimer/flighttimer.component';
import {TrafficButtonComponent} from './components/buttons/traffic-button/traffic-button.component';
import {SearchBoxComponent} from './search/components/search-box/search-box.component';
import {IconButtonDirective} from './shared/directives/icon-button/icon-button.directive';
import {StatusButtonDirective} from './shared/directives/status-button/status-button.directive';
import {TextButtonDirective} from './shared/directives/text-button/text-button.directive';
import {ButtonBaseDirective} from './shared/directives/button-base/button-base.directive';
import {SessionService} from './core/services/session/session.service';
import {UserService} from './user/services/user/user.service';
import {MessageService} from './core/services/utils/message.service';
import {TrackService} from './core/services/track/track.service';
import {FlightrouteService} from './flightroute/services/flightroute/flightroute.service';
import {StringnumberService} from './core/services/utils/stringnumber.service';
import {DatetimeService} from './core/services/utils/datetime.service';
import {MapService} from './core/services/map/map.service';
import {MapfeaturesService} from './core/services/map/mapfeatures.service';
import {MetarTafService} from './core/services/meteo/metar-taf.service';
import {NotamService} from './core/services/notam/notam.service';
import {TimerService} from './core/services/utils/timer.service';
import {LocationService} from './core/services/location/location.service';
import {TrafficService} from './core/services/traffic/traffic.service';
import {TrafficOgnService} from './core/services/traffic/traffic-ogn.service';
import {TrafficAdsbexchangeService} from './core/services/traffic/traffic-adsbexchange.service';
import {SearchService} from './search/services/search/search.service';
import {MapOverlayGeonameComponent} from './components/map-overlay/map-overlay-geoname/map-overlay-geoname.component';
import {MapOverlayNotamItemComponent} from './components/map-overlay/map-overlay-notam-item/map-overlay-notam-item.component';
import {MapOverlayButtonCloseComponent} from './components/map-overlay/map-overlay-button-close/map-overlay-button-close.component';
import {MapOverlayWindyiframeComponent} from './components/map-overlay/map-overlay-windyiframe/map-overlay-windyiframe.component';
import {ArrayService} from './core/services/utils/array.service';
import {MapOverlayButtonRemoveAlternateComponent} from './components/map-overlay/map-overlay-button-remove-alternate/map-overlay-button-remove-alternate.component';
import {MapOverlayWaypointComponent} from './components/map-overlay/map-overlay-waypoint/map-overlay-waypoint.component';
import {MapActionService} from 'app/core/services/map/map-action.service';
import {ClientstorageService} from './core/services/session/clientstorage.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './user/user.reducer';
import {UserEffects} from './user/user.effects';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './search/search.effects';
import {searchReducer} from './search/search.reducer';
import {flightrouteReducer} from './flightroute/flightroute.reducer';
import {FlightrouteEffects} from './flightroute/flightroute.effects';
import { FlightrouteContainerComponent } from './flightroute/components/flightroute-container/flightroute-container.component';
import { FlightrouteFormComponent } from './flightroute/components/flightroute-form/flightroute-form.component';
import { WaypointListComponent } from './flightroute/components/waypoint-list/waypoint-list.component';
import { FuelCalculationComponent } from './flightroute/components/fuel-calculation/fuel-calculation.component';
import { FlightrouteExportButtonsComponent } from './flightroute/components/flightroute-export-buttons/flightroute-export-buttons.component';
import { WaypointListEntryComponent } from './flightroute/components/waypoint-list-entry/waypoint-list-entry.component';
import { EditWaypointContainerComponent } from './flightroute/components/edit-waypoint-container/edit-waypoint-container.component';
import { EditWaypointFormComponent } from './flightroute/components/edit-waypoint-form/edit-waypoint-form.component';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        TracksComponent,
        SettingsComponent,
        AboutComponent,
        LoginComponent,
        MessageComponent,
        UserprofileComponent,
        ForgotpwComponent,
        ZoomButtonsComponent,
        LocationButtonComponent,
        FlighttimerComponent,
        TrafficButtonComponent,
        MapOverlayMetarTafComponent,
        MapOverlayTrafficComponent,
        MapOverlayNotamComponent,
        MapOverlayAirportComponent,
        MapOverlayNavaidComponent,
        MapOverlayReportingpointComponent,
        MapOverlayReportingsectorComponent,
        MapOverlayUserpointComponent,
        MapOverlayButtonMetarTafComponent,
        MapOverlayButtonAddToRouteComponent,
        MapOverlayButtonEditWaypointComponent,
        MapOverlayButtonRemoveFromRouteComponent,
        MapOverlayButtonSetAlternateComponent,
        MapOverlayButtonNotamComponent,
        MapOverlayButtonMeteogramComponent,
        MapOverlayButtonWebcamComponent,
        MapOverlayButtonEditUserpointComponent,
        MapOverlayMeteogramComponent,
        ButtonBaseDirective,
        IconButtonDirective,
        StatusButtonDirective,
        TextButtonDirective,
        SearchBoxComponent,
        MapOverlayGeonameComponent,
        MapOverlayNotamItemComponent,
        MapOverlayButtonCloseComponent,
        MapOverlayWindyiframeComponent,
        MapOverlayButtonRemoveAlternateComponent,
        MapOverlayWaypointComponent,
        FlightrouteContainerComponent,
        FlightrouteFormComponent,
        WaypointListComponent,
        FuelCalculationComponent,
        FlightrouteExportButtonsComponent,
        WaypointListEntryComponent,
        EditWaypointContainerComponent,
        EditWaypointFormComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        StoreModule.forRoot({
            userState: userReducer,
            searchState: searchReducer,
            flightrouteState: flightrouteReducer,
        }),
        EffectsModule.forRoot([
            UserEffects,
            SearchEffects,
            FlightrouteEffects,
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    providers: [
        SessionService,
        UserService,
        MessageService,
        TrackService,
        FlightrouteService,
        DatetimeService,
        StringnumberService,
        MapService,
        MapfeaturesService,
        MapActionService,
        MetarTafService,
        NotamService,
        TimerService,
        LocationService,
        TrafficService,
        TrafficOgnService,
        TrafficAdsbexchangeService,
        SearchService,
        ArrayService,
        ClientstorageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
