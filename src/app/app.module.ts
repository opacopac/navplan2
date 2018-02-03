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
import { TimerService } from './services/utils/timer.service';
import { LocationService } from './services/track/location.service';
import { FlighttimerComponent } from './components/flighttimer/flighttimer.component';
import { TrafficButtonComponent } from './components/traffic-button/traffic-button.component';
import { TrafficService} from './services/traffic/traffic.service';
import { TrafficOgnService } from './services/traffic/traffic-ogn.service';
import { TrafficAdsbexchangeService } from './services/traffic/traffic-adsbexchange.service';


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
        TrafficButtonComponent
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
        TimerService,
        LocationService,
        TrafficService,
        TrafficOgnService,
        TrafficAdsbexchangeService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
