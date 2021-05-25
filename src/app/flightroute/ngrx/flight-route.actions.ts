import {createAction, props} from '@ngrx/store';
import {Flightroute} from '../domain-model/flightroute';


export class FlightRouteActions {
    public static readonly read = createAction(
        '[Flightroute Page] Read flightroute',
        props<{ flightrouteId: number }>()
    );
    public static readonly save = createAction(
        '[Flightroute Page] Save flightroute',
    );
    public static readonly saveDuplicate = createAction(
        '[Flightroute Page] Save flightroute duplicate',
    );
    public static readonly delete = createAction(
        '[Flightroute Page] Delete flightroute',
        props<{ flightrouteId: number }>()
    );
    public static readonly show = createAction(
        '[FlightrouteEffects] Show flight route',
        props<{ flightroute: Flightroute }>()
    );
}
