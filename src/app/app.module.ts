import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {coreReducer} from './core/core.reducer';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppState} from './app-state';
import {SettingsPageComponent} from './core/components/settings-page/settings-page.component';
import {AboutPageComponent} from './core/components/about-page/about-page.component';
import {UserModule} from './user/user.module';
import {SearchModule} from './search/search.module';
import {FlightrouteModule} from './flightroute/flightroute.module';
import {SharedModule} from './shared/shared.module';
import {MapModule} from './map/map.module';
import {LocationModule} from './location/location.module';
import {TrafficModule} from './traffic/traffic.module';
import {NotamModule} from './notam/notam.module';
import {MapFeaturesModule} from './map-features/map-features.module';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {MapOlComponentsContainerComponent} from './core/components/map-ol-components-container/map-ol-components-container.component';
import {MapOverlayContainerComponent} from './core/components/map-overlay-container/map-overlay-container.component';
import {MapPageComponent} from './core/components/map-page/map-page.component';
import {NavbarOldComponent} from './core/components/navbar-old/navbar-old.component';
import {TracksPageComponent} from './core/components/tracks-page/tracks-page.component';
import {TrackModule} from './track/track.module';


@NgModule({
    declarations: [
        AppComponent,
        SettingsPageComponent,
        AboutPageComponent,
        NavbarComponent,
        NavbarOldComponent,
        MapPageComponent,
        MapOlComponentsContainerComponent,
        MapOverlayContainerComponent,
        TracksPageComponent,
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
        SharedModule,
        UserModule,
        SearchModule,
        FlightrouteModule,
        MapModule,
        LocationModule,
        TrackModule,
        TrafficModule,
        NotamModule,
        MapFeaturesModule,
        MapModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
