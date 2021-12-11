import {NgModule} from '@angular/core';
import {NavbarComponent} from './ng-components/navbar/navbar.component';
import {NavbarContainerComponent} from './ng-components/navbar-container/navbar-container.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        NavbarComponent,
        NavbarContainerComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule
    ],
    exports: [
        NavbarContainerComponent,
    ],
    providers: []
})
export class NavbarViewModule {
}
