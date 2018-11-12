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
import {FlightrouteModule} from './flightroute/flightroute.module';
import {SharedModule} from './shared/shared.module';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {TrackModule} from './track/track.module';
import {NavMapModule} from './nav-map/nav-map.module';
import {ChartMapModule} from './chart-map/chart-map.module';


@NgModule({
    declarations: [
        AppComponent,
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
export class AppModule {
}
