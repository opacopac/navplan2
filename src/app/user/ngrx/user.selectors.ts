import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from '../domain-model/user-state';


export const getUserState = createFeatureSelector<UserState>('userState');
export const getCurrentUser = createSelector(getUserState, state => state.currentUser);
export const getRegisterEmailSentTo = createSelector(getUserState, state => state.registerEmailSentTo);
export const getLostPwEmailSentTo = createSelector(getUserState, state => state.lostPwEmailSentTo);
