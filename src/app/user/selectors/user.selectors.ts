import {createFeatureSelector} from '@ngrx/store';
import {User} from '../../model/session/user';

export const getCurrentUser = createFeatureSelector<User>('currentUser');
