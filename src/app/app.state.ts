import {UserState} from './user/model/user-state';
import {SearchState} from './search/model/search-state';


export interface AppState {
    readonly userState: UserState;
    readonly searchState: SearchState;
}
