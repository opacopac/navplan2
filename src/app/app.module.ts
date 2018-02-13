import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { FlightrouteComponent } from './components/flightroute/flightroute.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';
import { WaypointlistComponent } from './components/waypointlist/waypointlist.component';
import { FuelcalcComponent } from './components/fuelcalc/fuelcalc.component';
import { EditwaypointComponent } from './components/editwaypoint/editwaypoint.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ForgotpwComponent } from './components/forgotpw/forgotpw.component';
import { ZoomButtonsComponent } from './components/zoom-buttons/zoom-buttons.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';

import { SessionService } from './services/utils/session.service';
import { UserService } from './services/user/user.service';
import { MessageService } from './services/utils/message.service';
import { TrackService } from './services/track/track.service';
import { FlightrouteService } from './services/flightroute/flightroute.service';
import { StringnumberService } from './services/utils/stringnumber.service';
import { DatetimeService } from './services/utils/datetime.service';
import { MapService } from './services/map/map.service';
import { MapfeaturesService } from './services/map/mapfeatures.service';
import { MetarTafService } from './services/meteo/metar-taf.service';
import { NotamService } from './services/notam/notam.service';
import { TimerService } from './services/utils/timer.service';
import { LocationService } from './services/track/location.service';
import { FlighttimerComponent } from './components/flighttimer/flighttimer.component';
import { TrafficButtonComponent } from './components/traffic-button/traffic-button.component';
import { TrafficService} from './services/traffic/traffic.service';
import { TrafficOgnService } from './services/traffic/traffic-ogn.service';
import { TrafficAdsbexchangeService } from './services/traffic/traffic-adsbexchange.service';
import { MapOverlayMetarTafComponent } from './components/map-overlay/map-overlay-metar-taf/map-overlay-metar-taf.component';
import { MapOverlayTrafficComponent } from './components/map-overlay/map-overlay-traffic/map-overlay-traffic.component';
import { MapOverlayNotamComponent } from './components/map-overlay/map-overlay-notam/map-overlay-notam.component';
import { MapOverlayAirportComponent } from './components/map-overlay/map-overlay-airport/map-overlay-airport.component';
import { MapOverlayNavaidComponent } from './components/map-overlay/map-overlay-navaid/map-overlay-navaid.component';
import { MapOverlayReportingpointComponent } from './components/map-overlay/map-overlay-reportingpoint/map-overlay-reportingpoint.component';
import { MapOverlayReportingsectorComponent } from './components/map-overlay/map-overlay-reportingsector/map-overlay-reportingsector.component';
import { MapOverlayUserpointComponent } from './components/map-overlay/map-overlay-userpoint/map-overlay-userpoint.component';
import { MapOverlayButtonMetarTafComponent } from './components/map-overlay/map-overlay-button-metar-taf/map-overlay-button-metar-taf.component';
import { MapOverlayButtonAddToRouteComponent } from './components/map-overlay/map-overlay-button-add-to-route/map-overlay-button-add-to-route.component';
import { MapOverlayButtonEditWaypointComponent } from './components/map-overlay/map-overlay-button-edit-waypoint/map-overlay-button-edit-waypoint.component';
import { MapOverlayButtonRemoveFromRouteComponent } from './components/map-overlay/map-overlay-button-remove-from-route/map-overlay-button-remove-from-route.component';
import { MapOverlayButtonSetAlternateComponent } from './components/map-overlay/map-overlay-button-set-alternate/map-overlay-button-set-alternate.component';
import { MapOverlayButtonNotamComponent } from './components/map-overlay/map-overlay-button-notam/map-overlay-button-notam.component';
import { MapOverlayButtonMeteogramComponent } from './components/map-overlay/map-overlay-button-meteogram/map-overlay-button-meteogram.component';
import { MapOverlayButtonWebcamComponent } from './components/map-overlay/map-overlay-button-webcam/map-overlay-button-webcam.component';
import { MapOverlayButtonEditUserpointComponent } from './components/map-overlay/map-overlay-button-edit-userpoint/map-overlay-button-edit-userpoint.component';
import { MapOverlayMeteogramComponent } from './components/map-overlay/map-overlay-meteogram/map-overlay-meteogram.component';
import { MapOverlayContainerComponent } from './components/map-overlay/map-overlay-container/map-overlay-container.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        FlightrouteComponent,
        TracksComponent,
        SettingsComponent,
        AboutComponent,
        LoginComponent,
        MessageComponent,
        UserprofileComponent,
        ForgotpwComponent,
        WaypointlistComponent,
        FuelcalcComponent,
        EditwaypointComponent,
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
        MapOverlayContainerComponent,
        IconButtonComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule
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
        MetarTafService,
        NotamService,
        TimerService,
        LocationService,
        TrafficService,
        TrafficOgnService,
        TrafficAdsbexchangeService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
