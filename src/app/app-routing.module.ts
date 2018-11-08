import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsPageComponent} from './core/components/settings-page/settings-page.component';
import {AboutPageComponent} from './core/components/about-page/about-page.component';
import {LoginComponent} from './user/components/login/login.component';
import {UserprofileComponent} from './user/components/userprofile/userprofile.component';
import {ForgotpwComponent} from './user/components/forgotpw/forgotpw.component';
import {FlightrouteContainerComponent} from './flightroute/components/flightroute-container/flightroute-container.component';
import {PlanningMapPageComponent} from './planning-map/components/map-page/planning-map-page.component';
import {TracksPageComponent} from './track/components/tracks-page/tracks-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: PlanningMapPageComponent },
    { path: 'route', component: FlightrouteContainerComponent },
    { path: 'tracks', component: TracksPageComponent },
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
