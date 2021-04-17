import {MessageState} from '../domain-model/message-state';
import {MessageActions, MessageActionTypes} from './message.actions';


const initialMessageState: MessageState = {
    currentMessage: undefined
};


export function messageReducer(state: MessageState = initialMessageState, action: MessageActions) {
    switch (action.type) {
        case MessageActionTypes.MESSAGE_SHOW:
            return { ...state, currentMessage: action.message };

        default:
            return state;
    }
}
