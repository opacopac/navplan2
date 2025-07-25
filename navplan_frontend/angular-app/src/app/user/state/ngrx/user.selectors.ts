import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from '../state-model/user-state';


export const getUserState = createFeatureSelector<UserState>('userState');
export const getCurrentUser = createSelector(getUserState, state => state.currentUser);
export const isUserLoggedIn = createSelector(getCurrentUser, user => user != null);
export const getRegisterEmailSentTo = createSelector(getUserState, state => state.registerEmailSentTo);
export const getLostPwEmailSentTo = createSelector(getUserState, state => state.lostPwEmailSentTo);
