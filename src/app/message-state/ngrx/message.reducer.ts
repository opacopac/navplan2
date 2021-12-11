import {MessageState} from '../state-model/message-state';
import {MessageActions} from './message.actions';
import {createReducer, on} from '@ngrx/store';


const initialState: MessageState = {
    currentMessage: undefined
};


export const messageReducer = createReducer(
    initialState,
    on(MessageActions.showMessage, (state, action) => ({
        ...state,
        currentMessage: action.message
    })),
);
