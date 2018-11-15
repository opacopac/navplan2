import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule, MatButtonToggleModule, MatCardModule,
    MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule, MatPaginatorModule, MatSelectModule, MatTableModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ButtonBaseDirective} from './directives/button-base/button-base.directive';
import {IconButtonDirective} from './directives/icon-button/icon-button.directive';
import {StatusButtonDirective} from './directives/status-button/status-button.directive';
import {TextButtonDirective} from './directives/text-button/text-button.directive';
import {MessageComponent} from './components/message/message.component';
import {MessageService} from './services/message/message.service';
import {OlOverlayButtonCloseComponent} from '../base-map/components/ol-overlay-button-close/ol-overlay-button-close.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ButtonBaseDirective,
        IconButtonDirective,
        MessageComponent,
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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,

        ButtonBaseDirective,
        IconButtonDirective,
        MessageComponent,
        OlOverlayButtonCloseComponent,
        StatusButtonDirective,
        TextButtonDirective,
    ],
    providers: [
        MessageService
    ]
})
export class SharedModule {
}
