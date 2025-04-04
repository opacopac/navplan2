import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {getCurrentUser} from '../../../user/state/ngrx/user.selectors';
import {FlightrouteListActions} from './flightroute-list.actions';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {IFlightrouteService} from '../../../flightroute/domain/service/i-flightroute.service';
import {User} from '../../../user/domain/model/user';


@Injectable()
export class FlightRouteListEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteService: IFlightrouteService
    ) {
    }


    readFlightRouteListAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteListActions.readList),
        withLatestFrom(this.currentUser$),
        switchMap(([action, currentUser]) => {
            if (currentUser) {
                return this.flightrouteService.readFlightrouteList().pipe(
                    map(routeList => FlightrouteListActions.readListSuccess({flightrouteList: routeList})),
                    catchError(error => of(MessageActions.showMessage({
                        message: Message.error('Error reading flight route list: ', error)
                    })))
                );
            } else {
                return of(FlightrouteListActions.readListSuccess({flightrouteList: []}));
            }
        })
    ));
}
