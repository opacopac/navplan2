import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MessageContainerComponent} from './ng-components/message-container/message-container.component';
import {MessageStateModule} from '../state/message-state.module';
import {MessageDomainModule} from '../domain/message-domain.module';


@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule,
        MessageDomainModule,
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
