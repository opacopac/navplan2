import {MessageState} from './message-state';
import {MessageActions, MessageActionTypes} from './message.actions';
import {Message} from './domain/message';


const initialState: MessageState = {
    currentMessage: undefined
};


export function messageReducer(state: MessageState = initialState, action: MessageActions) {
    switch (action.type) {
        case MessageActionTypes.MESSAGE_SHOW:
            return { ...state,
                currentMessage: new Message(action.messageType, action.message)
            };

        default:
            return state;
    }
}
