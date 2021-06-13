import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Observable, of, pipe} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {DataItemType} from '../../../common/model/data-item';
import {FlightMapActions} from './flight-map.actions';
import {getFlightMapState} from './flight-map.selectors';
import {FlightMapState} from '../../domain-model/flight-map-state';
import {OlHelper} from '../../../base-map/ol-service/ol-helper';
import {SearchActions} from '../../../search/ngrx/search.actions';
import {SearchState} from '../../../search/domain-model/search-state';
import {getSearchState} from '../../../search/ngrx/search.selectors';
import {INotamRepo} from '../../../notam/domain-service/i-notam-repo';
import {IDate} from '../../../system/domain-service/date/i-date';
import {SystemConfig} from '../../../system/domain-service/system-config';


@Injectable()
export class FlightMapEffects {
    private readonly date: IDate;
    private readonly flightMapState$: Observable<FlightMapState> = this.appStore.select(pipe(getFlightMapState));
    private readonly searchState$: Observable<SearchState> = this.appStore.select(pipe(getSearchState));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly notamRepo: INotamRepo,
        config: SystemConfig
    ) {
        this.date = config.getDate();
    }


    hideOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.flightMapState$),
        filter(([action, flightMapState]) => flightMapState.showOverlay.dataItem !== undefined),
        map(() => FlightMapActions.hideOverlay())
    ));


    showRepNavGeoUsrOverlayAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => [
            DataItemType.reportingPoint,
            DataItemType.reportingSector,
            DataItemType.navaid,
            DataItemType.geoname,
            DataItemType.userPoint
        ].includes(action.dataItem?.dataItemType)),
        switchMap(action => combineLatest([
            of(action),
            this.notamRepo.readByPosition(
                action.clickPos,
                this.date.getDayStartTimestamp(0),
                this.date.getDayEndTimestamp(2)
            )
        ]).pipe(take(1))),
        map(([action, notams]) => FlightMapActions.showOverlay({
            dataItem: action.dataItem,
            clickPos: action.clickPos,
            metarTaf: undefined,
            notams: notams,
            tabIndex: 0
        }))
    ));


    hidePositionSearchResultsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        withLatestFrom(this.searchState$),
        filter(([action, searchState]) => searchState.positionSearchState.clickPos !== undefined),
        map(() => SearchActions.hidePositionSearchResults())
    ));


    searchByPositionAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapClicked),
        filter(action => action.dataItem === undefined),
        withLatestFrom(this.flightMapState$, this.searchState$),
        filter(([action, flightMapState, searchState]) => {
            return !flightMapState.showOverlay.dataItem && !searchState.positionSearchState.clickPos;
        }),
        map(([action, flightMapState, searchState]) => {
            return SearchActions.searchByPosition({
                clickPos: action.clickPos,
                maxDegRadius: OlHelper.calcDegPerPixelByZoom(action.zoom) * 50,
                minNotamTimestamp: 0,
                maxNotamTimestamp: 999 // TODO
            });
        })
    ));
}
