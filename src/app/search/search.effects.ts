import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {debounceTime, filter, map, switchMap, withLatestFrom, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/index';
import {SearchService} from './services/search.service';
import {SearchActionTypes, SearchQuerySubmittedAction, SearchResultsReceivedAction} from './search.actions';
import {getCurrentUser} from '../user/user.selectors';
import {User} from '../user/domain/user';
import {LoggingService} from '../shared/services/logging/logging.service';


const MIN_QUERY_LENGTH = 3;
const QUERY_DELAY_MS = 250;


@Injectable()
export class SearchEffects {
    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private searchService: SearchService) {
    }

    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));

    @Effect()
    executeQuery$: Observable<Action> = this.actions$.pipe(
            ofType(SearchActionTypes.SEARCH_QUERY_SUBMITTED),
            map((action: SearchQuerySubmittedAction) => action.query),
            filter(query => query !== undefined && query.trim().length >= MIN_QUERY_LENGTH),
            debounceTime(QUERY_DELAY_MS),
            withLatestFrom(this.currentUser$),
            switchMap(([query, currentUser]) => this.searchService.searchByText(query, currentUser).pipe(
                map(result => new SearchResultsReceivedAction(result)),
                catchError(error => {
                    LoggingService.logResponseError('ERROR search by text', error);
                    return throwError(error);
                })
            ))
        );
}
