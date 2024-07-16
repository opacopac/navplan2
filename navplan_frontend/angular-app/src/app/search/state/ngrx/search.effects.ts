import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {throwError} from 'rxjs';
import {catchError, debounceTime, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {SearchActions} from './search.actions';
import {getCurrentUser} from '../../../user/state/ngrx/user.selectors';
import {LoggingService} from '../../../system/domain/service/logging/logging.service';
import {ISearchService} from '../../domain/service/i-search.service';
import {OlGeometry} from '../../../base-map/view/ol-model/ol-geometry';
import {BaseMapActions} from '../../../base-map/state/ngrx/base-map.actions';


const MIN_QUERY_LENGTH = 3;
const QUERY_DELAY_MS = 250;


@Injectable()
export class SearchEffects {
    private currentUser$ = this.appStore.pipe(select(getCurrentUser));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private searchService: ISearchService
    ) {
    }


    searchByPosition$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.searchByPosition),
        withLatestFrom(this.currentUser$),
        switchMap(([action, currentUser]) => this.searchService.searchByPosition(
            action.clickPos,
            OlGeometry.calcDegPerPixelByZoom(action.zoom) * 50,
            0,
            999 // TODO
        ).pipe(
            tap(result => LoggingService.logAction('show position search results', result)),
            map(result => SearchActions.showPositionSearchResults({
                positionSearchResults: result,
                clickPos: action.clickPos
            })),
            catchError(error => {
                LoggingService.logResponseError('ERROR search by position', error);
                return throwError(error);
            })
        ))
    ));


    searchByText$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.searchByText),
        filter(action => action.query !== undefined && action.query.trim().length >= MIN_QUERY_LENGTH),
        debounceTime(QUERY_DELAY_MS),
        withLatestFrom(this.currentUser$),
        switchMap(([action, currentUser]) => this.searchService.searchByText(action.query, currentUser).pipe(
            map(result => SearchActions.showTextSearchResults({searchResults: result})),
            catchError(error => {
                LoggingService.logResponseError('ERROR search by text', error);
                return throwError(error);
            })
        ))
    ));


    textSearchResultSelected$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.selectTextSearchResult),
        switchMap(action => [
            SearchActions.showPositionSearchResults({
                positionSearchResults: this.searchService.convertToPositionSearchResultList(action.searchItem),
                clickPos: action.searchItem.getPosition(),
            }),
            BaseMapActions.centerPosition({position: action.searchItem.getPosition()})
        ])
    ));
}
