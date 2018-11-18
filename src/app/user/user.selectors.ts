import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user-state';


export const getUserState = createFeatureSelector<UserState>('userState');
export const getCurrentUser = createSelector(getUserState, state => state.currentUser);
export const getVerifyEmailSentTo = createSelector(getUserState, state => state.verifyEmailSentTo);
