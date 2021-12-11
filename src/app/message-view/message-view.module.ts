import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MessageContainerComponent} from './ng-components/message-container/message-container.component';
import {MessageStateModule} from '../message-state/message-state.module';
import {MessageModule} from '../message/message.module';


@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule,
        MessageModule,
        MessageStateModule,
    ],
    declarations: [
        MessageContainerComponent,
    ],
    exports: [
        MessageContainerComponent,
    ],
    providers: [
    ]
})
export class MessageViewModule {
}
