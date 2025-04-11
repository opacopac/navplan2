import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi, withJsonpSupport} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FlightMapViewModule} from './flight-map/view/flight-map-view.module';
import {RouterModule} from '@angular/router';
import {appReducer} from './app.reducer';
import {AppEffects} from './app.effects';
import {NavbarViewModule} from './navbar/view/navbar-view.module';
import {SettingsViewModule} from './settings/view/settings-view.module';
import {ExporterViewModule} from './exporter/view/exporter-view.module';
import {TrackViewModule} from './track/view/track-view.module';
import {UserViewModule} from './user/view/user-view.module';
import {MessageViewModule} from './message/view/message-view.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {AircraftViewModule} from './aircraft/view/aircraft-view.module';
import {PlanViewModule} from './plan/view/plan-view.module';
import {CommonViewModule} from './common/view/common-view.module';
import {DownloadContainerComponent} from './exporter/view/ng-components/download-container/download-container.component';
import {MessageContainerComponent} from './message/view/ng-components/message-container/message-container.component';
import {NavbarContainerComponent} from './navbar/view/ng-components/navbar-container/navbar-container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        StoreModule.forRoot({'appState': appReducer}),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
            connectInZone: true
        }),
        AppRoutingModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonViewModule,
        ExporterViewModule,
        FlightMapViewModule,
        AircraftViewModule,
        PlanViewModule,
        MessageViewModule,
        NavbarViewModule,
        SettingsViewModule,
        TrackViewModule,
        UserViewModule,
        DownloadContainerComponent,
        MessageContainerComponent,
        NavbarContainerComponent
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ]
})
export class AppModule {
}
