import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MessageState} from '../domain-model/message-state';


export const getMessageState = createFeatureSelector<MessageState>('messageState');
export const getCurrentMessage = createSelector(getMessageState, state => state.currentMessage);
