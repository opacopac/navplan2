import 'rxjs-compat/add/operator/do';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import {SearchService} from '../services/search/search.service';
import {SearchActionTypes, SearchQuerySubmittedAction, SearchResultsReceivedAction} from './search.actions';
import {getCurrentUser} from "../user/user.selectors";
import {User} from "../user/model/user";
import {AppState} from "../app.state";


const MIN_QUERY_LENGTH = 3;
const QUERY_DELAY_MS = 250;


@Injectable()
export class SearchEffects {
    private currentUser$: Observable<User>;

    constructor(
        private actions$: Actions,
        private appStore: Store<AppState>,
        private searchService: SearchService) {

        this.currentUser$ = this.appStore.select(getCurrentUser);
    }


    @Effect()
    executeQuery$: Observable<Action> = this.actions$.ofType(SearchActionTypes.SEARCH_QUERY_SUBMITTED)
        .map((action: SearchQuerySubmittedAction) => action.query)
        .filter(query => query.trim().length >= MIN_QUERY_LENGTH)
        .debounceTime(QUERY_DELAY_MS)
        .withLatestFrom(this.currentUser$)
        .switchMap(([query, currentUser]) => this.searchService.searchByText(query, currentUser)
            .map(result => new SearchResultsReceivedAction(result))
            .catch(error => {
                console.error(error);
                return Observable.of(undefined);
            })
        );
}
