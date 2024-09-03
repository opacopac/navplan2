import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {IconButtonComponent} from './ng-components/icon-button/icon-button.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {StatusButtonComponent} from './ng-components/status-button/status-button.component';
import {MiniFabButtonComponent} from './ng-components/mini-fab-button/mini-fab-button.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormDialogComponent} from './ng-components/form-dialog/form-dialog.component';
import {ConfirmDeleteDialogComponent} from './ng-components/confirm-delete-dialog/confirm-delete-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
    ],
    declarations: [
        IconButtonComponent,
        MiniFabButtonComponent,
        StatusButtonComponent,
        ConfirmDeleteDialogComponent,
        FormDialogComponent,
    ],
    exports: [
        IconButtonComponent,
        StatusButtonComponent,
        MiniFabButtonComponent,
        ConfirmDeleteDialogComponent,
        FormDialogComponent,
    ],
    providers: []
})
export class CommonViewModule {
}
