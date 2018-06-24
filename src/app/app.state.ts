import {User} from './model/session/user';

export interface AppState {
    readonly currentUser: User;
}
