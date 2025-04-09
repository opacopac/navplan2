import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {messageReducer} from './ngrx/message.reducer';
import {MessageDomainModule} from '../domain/message-domain.module';


@NgModule({
    imports: [
        StoreModule.forFeature('messageState', messageReducer),
        MessageDomainModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MessageStateModule {
}
