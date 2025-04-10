import {NgModule} from '@angular/core';
import {MessageStateModule} from '../state/message-state.module';
import {MessageDomainModule} from '../domain/message-domain.module';


@NgModule({
    imports: [
        MessageDomainModule,
        MessageStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class MessageViewModule {
}
