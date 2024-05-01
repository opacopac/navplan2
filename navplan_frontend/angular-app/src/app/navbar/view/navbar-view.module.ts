import {NgModule} from '@angular/core';
import {NavbarComponent} from './ng-components/navbar/navbar.component';
import {NavbarContainerComponent} from './ng-components/navbar-container/navbar-container.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {CommonModule} from '@angular/common';
import {ClearDialogComponent} from './ng-components/clear-dialog/clear-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule
    ],
    declarations: [
        NavbarComponent,
        NavbarContainerComponent,
        ClearDialogComponent,
    ],
    exports: [
        NavbarContainerComponent,
    ],
    providers: []
})
export class NavbarViewModule {
}
