import 'rxjs-compat/add/operator/do';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SearchService} from '../services/search/search.service';
import {SearchActionTypes, SearchQuerySubmittedAction, SearchResultsReceivedAction} from './search.actions';


const MIN_QUERY_LENGTH = 3;
const QUERY_DELAY_MS = 250;


@Injectable()
export class SearchEffects {
    constructor(
        private actions$: Actions,
        private searchService: SearchService) {
    }


    @Effect()
    executeQuery$: Observable<Action> = this.actions$.ofType(SearchActionTypes.SEARCH_QUERY_SUBMITTED)
        .map((action: SearchQuerySubmittedAction) => action)
        .filter(action => action.query.trim().length >= MIN_QUERY_LENGTH)
        .debounceTime(QUERY_DELAY_MS)
        .switchMap(action => this.searchService.searchByText(action.query, action.currentUser)
            .map(result => new SearchResultsReceivedAction(result))
            .catch(error => {
                console.error(error);
                return Observable.of(undefined);
            })
        );
}
