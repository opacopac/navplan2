import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {UserState} from '../../user-state/state-model/user-state';
import {getUserState} from '../../user-state/ngrx/user.selectors';
import {FlightrouteListActions} from './flightroute-list.actions';
import {MessageActions} from '../../message/ngrx/message.actions';
import {Message} from '../../message/domain-model/message';
import {IFlightrouteService} from '../../flightroute/domain-service/i-flightroute.service';


@Injectable()
export class FlightRouteListEffects {
    private readonly userState$: Observable<UserState> = this.appStore.select(getUserState);


    constructor(
        private readonly actions$: Actions,
        private readonly appStore: Store<any>,
        private readonly flightrouteService: IFlightrouteService
    ) {
    }



    readFlightRouteListAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteListActions.readList),
        withLatestFrom(this.userState$),
        filter(([action, userState]) => userState.currentUser !== undefined),
        switchMap(([action, userState]) => this.flightrouteService.readFlightrouteList(
            userState.currentUser
        ).pipe(
            map(routeList => FlightrouteListActions.showList({ flightrouteList: routeList })),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading flight route list: ', error)
            })))
        ))
    ));
}
