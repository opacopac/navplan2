import {createAction, props} from '@ngrx/store';
import {Message} from '../../domain/model/message';


export class MessageActions {
    public static readonly showMessage = createAction(
        '[Misc] Show message',
        props<{ message: Message }>()
    );
}
