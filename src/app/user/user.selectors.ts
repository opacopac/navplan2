import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './model/user-state';


export const getUserState = createFeatureSelector<UserState>('userState');
export const getCurrentUser = createSelector(getUserState, userState => userState.currentUser);
