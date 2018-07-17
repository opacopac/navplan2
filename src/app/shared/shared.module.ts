import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonBaseDirective} from './directives/button-base/button-base.directive';
import {IconButtonDirective} from './directives/icon-button/icon-button.directive';
import {StatusButtonDirective} from './directives/status-button/status-button.directive';
import {TextButtonDirective} from './directives/text-button/text-button.directive';
import {MessageComponent} from './components/message/message.component';
import {MessageService} from './services/message/message.service';
import {MapOverlayButtonCloseComponent} from './components/map-overlay-button-close/map-overlay-button-close.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MessageComponent,
        ButtonBaseDirective,
        IconButtonDirective,
        MapOverlayButtonCloseComponent,
        StatusButtonDirective,
        TextButtonDirective,

    ],
    exports: [
        MessageComponent,
        ButtonBaseDirective,
        IconButtonDirective,
        MapOverlayButtonCloseComponent,
        StatusButtonDirective,
        TextButtonDirective,
        MatButtonModule,
    ],
    providers: [
        MessageService
    ]
})
export class SharedModule {}
