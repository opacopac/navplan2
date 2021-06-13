import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {UserState} from '../../user/ngrx/user-state';
import {getUserState} from '../../user/ngrx/user.selectors';
import {FlightRouteListActions} from './flight-route-list.actions';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';
import {IFlightrouteRepo} from '../domain-service/i-flightroute-repo';


@Injectable()
export class FlightRouteListEffects {
    private readonly userState$: Observable<UserState> = this.appStore.select(getUserState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteRepo: IFlightrouteRepo
    ) {
    }



    readFlightRouteListAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightRouteListActions.readList),
        withLatestFrom(this.userState$),
        filter(([action, userState]) => userState.currentUser !== undefined),
        switchMap(([action, userState]) => this.flightrouteRepo.readFlightrouteList(
            userState.currentUser
        ).pipe(
            map(routeList => FlightRouteListActions.showList({ flightrouteList: routeList })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading flight route list: ', error)
            })))
        ))
    ));
}
