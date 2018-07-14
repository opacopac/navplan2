import {createFeatureSelector, createSelector, Selector, Store} from '@ngrx/store';
import {UserState} from './model/user-state';
import {CoreState} from '../core/model/core-state';
import {User} from './model/user';
import {Observable} from 'rxjs/internal/Observable';
import {getCoreState} from '../core/core.selectors';


// export const getUserState = createFeatureSelector<UserState>('userState');
// export const getUserState: Selector<CoreState, UserState> = (appState) => appState.userState;
export const getUserState = createSelector(getCoreState, state => state.userState);
export const getCurrentUser = createSelector(getUserState, state => state.currentUser);
