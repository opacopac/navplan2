import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule, MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatDialogModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatTableModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
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
