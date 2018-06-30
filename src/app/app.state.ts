import {UserState} from "./user/model/user-state";
import {SearchState} from "./search/model/search-state";
import {FlightrouteState} from "./flightroute/model/flightroute-state";

export interface AppState {
    userState: UserState;
    searchState: SearchState;
    flightrouteState: FlightrouteState;
}
