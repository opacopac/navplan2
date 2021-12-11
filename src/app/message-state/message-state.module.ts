import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {messageReducer} from './ngrx/message.reducer';


@NgModule({
    imports: [
        StoreModule.forFeature('messageState', messageReducer),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class MessageStateModule {
}
