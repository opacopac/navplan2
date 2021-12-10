import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {messageReducer} from './ngrx/message.reducer';
import {MessageContainerComponent} from './ng-components/message-container/message-container.component';


@NgModule({
    declarations: [
        MessageContainerComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature('messageState', messageReducer),
    ],
    exports: [
        MessageContainerComponent,
    ],
    providers: [
    ]
})
export class MessageModule {
}
