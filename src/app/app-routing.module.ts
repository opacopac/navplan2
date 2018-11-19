import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsPageComponent} from './core/components/settings-page/settings-page.component';
import {AboutPageComponent} from './core/components/about-page/about-page.component';
import {UserProfilePageComponent} from './user/components/user-profile-page/user-profile-page.component';
import {ForgotpwComponent} from './user/components/forgotpw/forgotpw.component';
import {NavMapPageComponent} from './nav-map/components/nav-map-page/nav-map-page.component';
import {TracksPageComponent} from './track/components/tracks-page/tracks-page.component';
import {ChartMapPageComponent} from './chart-map/components/chart-map-page/chart-map-page.component';
import {FlightroutePageComponent} from './flightroute/components/flightroute-page/flightroute-page.component';
import {LoginRegisterPageComponent} from './user/components/login-register-page/login-register-page.component';
import {RegisterStep2PageComponent} from './user/components/register-step2-page/register-step2-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: NavMapPageComponent },
    { path: 'chartmap', component: ChartMapPageComponent },
    { path: 'route', component: FlightroutePageComponent },
    { path: 'tracks', component: TracksPageComponent },
    { path: 'login', component: LoginRegisterPageComponent },
    { path: 'register/:token', component: RegisterStep2PageComponent },
    { path: 'userprofile', component: UserProfilePageComponent },
    { path: 'forgotpw', component: ForgotpwComponent },
    { path: 'settings', component: SettingsPageComponent },
    { path: 'about', component: AboutPageComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
