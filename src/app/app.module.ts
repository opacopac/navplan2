import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from './user/user.module';
import {SharedModule} from './common/shared.module';
import {FlightMapModule} from './flight-map/flight-map.module';
import {MessageModule} from './message/message.module';
import {AboutPageModule} from './about-page/about-page.module';
import {RouterModule} from '@angular/router';
import {appReducer} from './app.reducer';
import {AppEffects} from './app.effects';
import {NavbarModule} from './navbar/navbar.module';
import {SettingsPageModule} from './settings-page/settings-page.module';
import {FlightPrepModule} from './flight-prep/flight-prep.module';
import {TrackPageModule} from './track-page/track-page.module';
import {ExporterViewModule} from './exporter-view/exporter-view.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule,
        StoreModule.forRoot({'appState': appReducer }),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        AppRoutingModule,
        NavbarModule,
        AboutPageModule,
        SettingsPageModule,
        SharedModule,
        UserModule,
        FlightMapModule,
        FlightPrepModule,
        TrackPageModule,
        MessageModule,
        ExporterViewModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
