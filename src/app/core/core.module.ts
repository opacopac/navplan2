/***
 *
import {NgModule} from '@angular/core';
import {FlighttimerComponent} from './components/flighttimer/flighttimer.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FlightTimerState} from './flight-timer-state';
import {FlightTimerActions} from './flight-timer.actions';
import {flightTimerReducer} from './flight-timer.reducer';
import {AppComponent} from '../app.component';
import {SettingsPageComponent} from './components/settings-page/settings-page.component';
import {AboutPageComponent} from './components/about-page/about-page.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {AppState} from '../app-state';
import {coreReducer} from './core.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {LayoutModule} from '@angular/cdk/layout';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {UserModule} from '../user/user.module';
import {NavMapModule} from '../nav-map/nav-map.module';
import {FlightrouteModule} from '../flightroute/flightroute.module';
import {TrackModule} from '../track/track.module';
import {ChartMapModule} from '../chart-map/chart-map.module';


@NgModule({
    declarations: [
        SettingsPageComponent,
        AboutPageComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        StoreModule.forRoot<AppState>({
            coreState: coreReducer
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        SharedModule,
        UserModule,
        NavMapModule,
        FlightrouteModule,
        TrackModule,
        ChartMapModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class FlightTimerModule {
}
*/
