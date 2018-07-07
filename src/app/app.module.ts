import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SettingsComponent} from './core/components/settings/settings.component';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {AboutComponent} from './core/components/about/about.component';
import {UserModule} from './user/user.module';
import {SearchModule} from './search/search.module';
import {FlightrouteModule} from './flightroute/flightroute.module';
import {SharedModule} from './shared/shared.module';
import {MapModule} from './map/map.module';
import {LocationModule} from './location/location.module';
import {TrafficModule} from './traffic/traffic.module';
import {NotamModule} from './notam/notam.module';
import {MapFeaturesModule} from './map-features/map-features.module';


@NgModule({
    declarations: [
        AppComponent,
        SettingsComponent,
        AboutComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        SharedModule,
        UserModule,
        SearchModule,
        FlightrouteModule,
        MapModule,
        LocationModule,
        TrafficModule,
        NotamModule,
        MapFeaturesModule,
        MapModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
