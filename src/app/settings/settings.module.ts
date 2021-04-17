import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SettingsPageComponent} from './ng-components/settings-page/settings-page.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        SettingsPageComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        SettingsPageComponent
    ],
    providers: []
})
export class SettingsModule {
}
