import {Actions, createEffect, ofType} from '@ngrx/effects';
import {debounceTime, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NavaidActions} from './navaid.actions';
import {BaseMapActions} from '../../../base-map/ngrx/base-map.actions';
import {Store} from '@ngrx/store';
import {INavaidRepo} from '../../../enroute/domain-service/i-navaid-repo';
import {getNavaidState} from './navaid.selectors';
import {environment} from '../../../../environments/environment';


@Injectable()
export class NavaidEffects {
    private readonly navaidState$ = this.appStore.select(getNavaidState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly navaidRepo: INavaidRepo,
    ) {
    }


    showNavaidsAction$ = createEffect(() => this.actions$.pipe(
        ofType(BaseMapActions.mapMoved),
        debounceTime(250),
        withLatestFrom(this.navaidState$),
        filter(([action, currentState]) => !currentState.extent
            || !action.extent
            || currentState.zoom !== action.zoom
            || !currentState.extent.containsExtent2d(action.extent)),
        switchMap(([action, currentState]) => this.navaidRepo.readNavaidsByExtent(
            action.extent.getOversizeExtent(environment.mapOversizeFactor),
            action.zoom
        ).pipe(
            map(navaids => NavaidActions.showNavaids({
                navaids: navaids,
                extent: action.extent.getOversizeExtent(environment.mapOversizeFactor),
                zoom: action.zoom,
            })
        ))
    )));
}
