import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {MessageService} from './services/message.service';
import {MessageState} from './message-state';
import {MessageActions} from './message.actions';
import {messageReducer} from './message.reducer';
import {MessageContainerComponent} from './components/message-container/message-container.component';


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
