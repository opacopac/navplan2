import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ButtonBaseDirective} from './directives/button-base/button-base.directive';
import {IconButtonDirective} from './directives/icon-button/icon-button.directive';
import {StatusButtonDirective} from './directives/status-button/status-button.directive';
import {TextButtonDirective} from './directives/text-button/text-button.directive';
import {OlOverlayButtonCloseComponent} from '../ol-map/components/ol-overlay-button-close/ol-overlay-button-close.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SystemConfig} from '../system/system-config';


@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ButtonBaseDirective,
        IconButtonDirective,
        OlOverlayButtonCloseComponent,
        StatusButtonDirective,
        TextButtonDirective,
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,

        ReactiveFormsModule,
        ButtonBaseDirective,
        IconButtonDirective,
        OlOverlayButtonCloseComponent,
        StatusButtonDirective,
        TextButtonDirective,
    ],
    providers: [
        SystemConfig
    ]
})
export class SharedModule {
}
