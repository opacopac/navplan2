import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../common/shared.module';
import {NavbarComponent} from './ng-components/navbar/navbar.component';
import {NavbarContainerComponent} from './ng-components/navbar-container/navbar-container.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        NavbarComponent,
        NavbarContainerComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        NavbarContainerComponent,
    ],
    providers: []
})
export class NavbarModule {
}
