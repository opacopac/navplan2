import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {messageReducer} from './ngrx/message.reducer';
import {MessageContainerComponent} from './ng-components/message-container/message-container.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('messageState', messageReducer),
        MatSnackBarModule,
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
export class MessageModule {
}
