import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from './user/user.module';
import {FlightrouteModule} from './flightroute/flightroute.module';
import {SharedModule} from './shared/shared.module';
import {TrackModule} from './track/track.module';
import {NavMapModule} from './nav-map/nav-map.module';
import {ChartMapModule} from './chart-map/chart-map.module';
import {MessageModule} from './message/message.module';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {appReducer} from './app.reducer';
import {AppEffects} from './app.effects';


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
        CoreModule,
        SharedModule,
        UserModule,
        NavMapModule,
        FlightrouteModule,
        TrackModule,
        ChartMapModule,
        MessageModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
