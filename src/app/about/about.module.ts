import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AboutPageComponent} from './ng-components/about-page/about-page.component';
import {SharedModule} from '../common/shared.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        AboutPageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        AboutPageComponent,
    ],
    providers: []
})
export class AboutModule {
}
