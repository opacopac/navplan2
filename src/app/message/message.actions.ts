import {Action} from '@ngrx/store';
import {MessageType} from './domain/message-type';


export enum MessageActionTypes {
    MESSAGE_SHOW = '[MessageService] Show message',
}


export class ShowMessageAction implements Action {
    readonly type = MessageActionTypes.MESSAGE_SHOW;

    constructor(
        public messageType: MessageType,
        public message: string) {}
}


export type MessageActions =
    ShowMessageAction;
