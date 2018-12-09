import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SettingsPageComponent} from './components/settings-page/settings-page.component';
import {AboutPageComponent} from './components/about-page/about-page.component';
import {UserModule} from '../user/user.module';
import {SharedModule} from '../shared/shared.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NavbarContainerComponent} from './components/navbar-container/navbar-container.component';
import {MessageModule} from '../message/message.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        SettingsPageComponent,
        AboutPageComponent,
        NavbarComponent,
        NavbarContainerComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
        UserModule,
        MessageModule,
    ],
    exports: [
        NavbarContainerComponent,
        AboutPageComponent,
        SettingsPageComponent
    ],
    providers: []
})
export class CoreModule {
}
