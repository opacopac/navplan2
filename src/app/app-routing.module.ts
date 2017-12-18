import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { FlightrouteComponent } from './components/flightroute/flightroute.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ForgotpwComponent } from './components/forgotpw/forgotpw.component';

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: MapComponent },
    { path: 'route', component: FlightrouteComponent },
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
