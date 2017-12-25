import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { TrackService } from './services/track.service';
import { FlightrouteService } from './services/flightroute.service';
import { StringnumberService } from './services/stringnumber.service';
import { DatetimeService } from './services/datetime.service';
import { MapService } from './services/map.service';
import { MapfeaturesService } from './services/mapfeatures.service';
import { FlighttimerService } from './services/flighttimer.service';
import { LocationService } from './services/location.service';
import { FlighttimerComponent } from './components/flighttimer/flighttimer.component';
import { TrafficButtonComponent } from './components/traffic-button/traffic-button.component';
import { TrafficService} from './services/traffic.service';
import { TrafficOgnService } from './services/traffic-ogn.service';


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
        HttpClientModule
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
        FlighttimerService,
        LocationService,
        TrafficService,
        TrafficOgnService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
