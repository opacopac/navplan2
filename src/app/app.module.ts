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
import {AboutPageViewModule} from './about-page-view/about-page-view.module';
import {RouterModule} from '@angular/router';
import {appReducer} from './app.reducer';
import {AppEffects} from './app.effects';
import {NavbarModule} from './navbar/navbar.module';
import {SettingsPageViewModule} from './settings-page-view/settings-page-view.module';
import {FlightPrepModule} from './flight-prep/flight-prep.module';
import {ExporterViewModule} from './exporter-view/exporter-view.module';
import {TrackViewModule} from './track-view/track-view.module';


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
        AboutPageViewModule,
        SettingsPageViewModule,
        SharedModule,
        UserModule,
        FlightMapModule,
        FlightPrepModule,
        TrackViewModule,
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
