import {NgModule} from '@angular/core';
import {NavbarComponent} from './ng-components/navbar/navbar.component';
import {NavbarContainerComponent} from './ng-components/navbar-container/navbar-container.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {RouterModule} from '@angular/router';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {CommonModule} from '@angular/common';
import {ClearDialogComponent} from './ng-components/clear-dialog/clear-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';


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
