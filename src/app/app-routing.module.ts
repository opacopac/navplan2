import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksComponent } from './location/components/tracks/tracks.component';
import { SettingsComponent } from './core/components/settings/settings.component';
import { AboutComponent } from './core/components/about/about.component';
import { LoginComponent } from './user/components/login/login.component';
import { UserprofileComponent } from './user/components/userprofile/userprofile.component';
import { ForgotpwComponent } from './user/components/forgotpw/forgotpw.component';
import {FlightrouteContainerComponent} from './flightroute/components/flightroute-container/flightroute-container.component';
import {MapContainerComponent} from './map/components/map-container/map-container.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: MapContainerComponent },
    { path: 'route', component: FlightrouteContainerComponent },
    { path: 'tracks', component: TracksComponent },
    { path: 'login', component: LoginComponent },
    { path: 'userprofile', component: UserprofileComponent },
    { path: 'forgotpw', component: ForgotpwComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
