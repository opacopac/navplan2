import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsPageComponent} from './settings/ng-components/settings-page/settings-page.component';
import {AboutPageComponent} from './about/ng-components/about-page/about-page.component';
import {UserProfilePageComponent} from './user/ng-components/user-profile-page/user-profile-page.component';
import {FlightMapPageComponent} from './flight-map/ng-components/flight-map-page/flight-map-page.component';
import {TracksPageComponent} from './track/ng-components/tracks-page/tracks-page.component';
import {FlightroutePageComponent} from './flightroute/ng-components/flightroute-page/flightroute-page.component';
import {LoginRegisterPageComponent} from './user/ng-components/login-register-page/login-register-page.component';
import {RegisterStep2PageComponent} from './user/ng-components/register-step2-page/register-step2-page.component';
import {ForgotPwStep1PageComponent} from './user/ng-components/forgot-pw-step1-page/forgot-pw-step1-page.component';
import {ForgotPwStep2PageComponent} from './user/ng-components/forgot-pw-step2-page/forgot-pw-step2-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: FlightMapPageComponent },
    { path: 'route', component: FlightroutePageComponent },
    { path: 'tracks', component: TracksPageComponent },
    { path: 'login', component: LoginRegisterPageComponent },
    { path: 'register/:token', component: RegisterStep2PageComponent },
    { path: 'userprofile', component: UserProfilePageComponent },
    { path: 'forgotpw', component: ForgotPwStep1PageComponent },
    { path: 'resetpw/:token', component: ForgotPwStep2PageComponent },
    { path: 'settings', component: SettingsPageComponent },
    { path: 'about', component: AboutPageComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
