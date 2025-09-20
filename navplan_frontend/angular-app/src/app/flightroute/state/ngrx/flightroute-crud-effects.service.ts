import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap, Observable, of} from 'rxjs';
import {catchError, filter, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {getCurrentUser} from '../../../user/state/ngrx/user.selectors';
import {User} from '../../../user/domain/model/user';
import {getFlightroute} from './flightroute.selectors';
import {Flightroute} from '../../domain/model/flightroute';
import {FlightrouteCrudActions} from './flightroute-crud.actions';
import {MessageActions} from '../../../message/state/ngrx/message.actions';
import {Message} from '../../../message/domain/model/message';
import {FlightrouteActions} from './flightroute.actions';
import {IFlightrouteService} from '../../domain/service/i-flightroute.service';
import {FlightrouteListActions} from '../../../plan-route-list/state/ngrx/flightroute-list.actions';
import {Router} from '@angular/router';
import {PlanActions} from '../../../plan/state/ngrx/plan.actions';


@Injectable()
export class FlightRouteCrudEffects {
    private currentUser$: Observable<User> = this.appStore.pipe(select(getCurrentUser));
    private flightroute$: Observable<Flightroute> = this.appStore.pipe(select(getFlightroute));


    constructor(
        private actions$: Actions,
        private appStore: Store<any>,
        private flightrouteService: IFlightrouteService,
        private router: Router,
    ) {
    }


    readFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteCrudActions.read),
        withLatestFrom(this.currentUser$),
        filter(([action, currentUser]) => action.flightrouteId > 0 && currentUser !== undefined),
        switchMap(([action, currentUser]) => this.flightrouteService.readFlightroute(
            action.flightrouteId
        ).pipe(
            mergeMap(route => [
                FlightrouteActions.changed({flightroute: route}),
                PlanActions.selectPlanTab({selectedPlanTab: 'route'}),
                MessageActions.showMessage({
                    message: Message.success('Flight route ' + route.title + ' selected.')
                })
            ]),
            tap(() => this.router.navigate(['/plan', 'route'])), // TODO: move to effect?
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error reading flight route', error)
            })))
        ))
    ));


    saveFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteCrudActions.save),
        withLatestFrom(this.flightroute$),
        filter(([action, flightroute]) => flightroute !== undefined),
        switchMap(([action, flightroute]) => this.flightrouteService.saveFlightroute(
            flightroute
        ).pipe(
            mergeMap(route => [
                FlightrouteListActions.readList(),
                FlightrouteActions.update({flightroute: route}),
                MessageActions.showMessage({
                    message: Message.success('Flight route saved successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error while saving flight route:', error)
            })))
        ))
    ));


    saveDuplicateFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteCrudActions.saveDuplicate),
        switchMap((action) => this.flightrouteService.duplicateFlightroute(
            action.flightrouteId
        ).pipe(
            mergeMap(route => [
                FlightrouteListActions.readList(),
                FlightrouteActions.update({flightroute: route}),
                MessageActions.showMessage({
                    message: Message.success('Flight route duplicated successfully.')
                })
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error while duplicating flight route:', error)
            })))
        ))
    ));


    deleteFlightrouteAction$ = createEffect(() => this.actions$.pipe(
        ofType(FlightrouteCrudActions.delete),
        filter((action) => action.flightrouteId > 0),
        switchMap((action) => this.flightrouteService.deleteFlightroute(
            action.flightrouteId
        ).pipe(
            mergeMap(() => [
                FlightrouteListActions.readList(),
                MessageActions.showMessage({
                    message: Message.success('Flight route deleted successfully.')
                }),
            ]),
            catchError(error => of(MessageActions.showMessage({
                message: Message.error('Error deleting flight route', error)
            })))
        ))
    ));
}
