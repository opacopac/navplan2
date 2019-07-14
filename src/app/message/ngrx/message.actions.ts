import {Action} from '@ngrx/store';
import {Message} from '../domain/message';


export enum MessageActionTypes {
    MESSAGE_SHOW = '[MessageService] Show message',
}


export class ShowMessageAction implements Action {
    readonly type = MessageActionTypes.MESSAGE_SHOW;

    constructor(public message: Message) {}
}


export type MessageActions =
    ShowMessageAction;
