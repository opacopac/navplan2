import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {MessageService} from './domain-service/message.service';
import {MessageState} from './domain-model/message-state';
import {MessageActions} from './ngrx/message.actions';
import {messageReducer} from './ngrx/message.reducer';
import {MessageContainerComponent} from './ng-components/message-container/message-container.component';


@NgModule({
    declarations: [
        MessageContainerComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature<MessageState, MessageActions>('messageState', messageReducer),
    ],
    exports: [
        MessageContainerComponent,
    ],
    providers: [
        MessageService
    ]
})
export class MessageModule {
}
