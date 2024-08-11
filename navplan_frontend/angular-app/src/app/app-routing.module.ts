import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsPageComponent} from './settings/view/ng-components/settings-page/settings-page.component';
import {AboutPageComponent} from './about/view/ng-components/about-page/about-page.component';
import {
    UserProfilePageComponent
} from './user/view/ng-components/user-profile/user-profile-page/user-profile-page.component';
import {FlightMapPageComponent} from './flight-map/view/ng-components/flight-map-page/flight-map-page.component';
import {TracksPageComponent} from './track/view/ng-components/tracks-page/tracks-page.component';
import {
    LoginRegisterPageComponent
} from './user/view/ng-components/user-profile/login-register-page/login-register-page.component';
import {
    RegisterStep2PageComponent
} from './user/view/ng-components/user-profile/register-step2-page/register-step2-page.component';
import {
    ForgotPwStep1PageComponent
} from './user/view/ng-components/user-profile/forgot-pw-step1-page/forgot-pw-step1-page.component';
import {
    ForgotPwStep2PageComponent
} from './user/view/ng-components/user-profile/forgot-pw-step2-page/forgot-pw-step2-page.component';
import {PlanPageComponent} from './flightroute/view/ng-components/plan-page/plan-page.component';
import {AircraftPageComponent} from './aircraft/view/ng-components/aircraft-page/aircraft-page.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: FlightMapPageComponent },
    { path: 'plan', component: PlanPageComponent },
    { path: 'plan/:tab', component: PlanPageComponent },
    { path: 'aircraft', component: AircraftPageComponent },
    { path: 'aircraft/:tab', component: AircraftPageComponent },
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
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
