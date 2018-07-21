import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './location/components/tracks/tracks.component';
import { SettingsPageComponent } from './core/components/settings-page/settings-page.component';
import { AboutPageComponent } from './core/components/about-page/about-page.component';
import { LoginComponent } from './user/components/login/login.component';
import { UserprofileComponent } from './user/components/userprofile/userprofile.component';
import { ForgotpwComponent } from './user/components/forgotpw/forgotpw.component';
import {FlightrouteContainerComponent} from './flightroute/components/flightroute-container/flightroute-container.component';
import {MapPageComponent} from './core/components/map-page/map-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: MapPageComponent },
    { path: 'route', component: FlightrouteContainerComponent },
    { path: 'tracks', component: TracksComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userprofile', component: UserprofileComponent },
    { path: 'forgotpw', component: ForgotpwComponent },
    { path: 'settings', component: SettingsPageComponent },
    { path: 'about', component: AboutPageComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
