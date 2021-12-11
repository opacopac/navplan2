import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FlightMapViewModule} from './flight-map-view/flight-map-view.module';
import {MessageModule} from './message/message.module';
import {AboutViewModule} from './about-view/about-view.module';
import {RouterModule} from '@angular/router';
import {appReducer} from './app.reducer';
import {AppEffects} from './app.effects';
import {NavbarViewModule} from './navbar-view/navbar-view.module';
import {SettingsPageViewModule} from './settings-page-view/settings-page-view.module';
import {FlightPrepViewModule} from './flight-prep-view/flight-prep-view.module';
import {ExporterViewModule} from './exporter-view/exporter-view.module';
import {TrackViewModule} from './track-view/track-view.module';
import {UserViewModule} from './user-view/user-view.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        RouterModule,
        StoreModule.forRoot({'appState': appReducer}),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        AppRoutingModule,
        NavbarViewModule,
        AboutViewModule,
        SettingsPageViewModule,
        UserViewModule,
        FlightMapViewModule,
        FlightPrepViewModule,
        TrackViewModule,
        MessageModule,
        ExporterViewModule,
        FlexLayoutModule,
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
