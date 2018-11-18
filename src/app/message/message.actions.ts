import {Action} from '@ngrx/store';
import {MessageType} from './model/message-type';


export enum MessageActionTypes {
    MESSAGE_SHOW = '[MessageService] Show message',
    MESSAGE_HIDE = '[MessageService] Hide message'
}


export class ShowMessageAction implements Action {
    readonly type = MessageActionTypes.MESSAGE_SHOW;

    constructor(
        public messageType: MessageType,
        public message: string) {}
}


export class HideMessageAction implements Action {
    readonly type = MessageActionTypes.MESSAGE_HIDE;

    constructor() {}
}


export type MessageActions =
    ShowMessageAction |
    HideMessageAction;
