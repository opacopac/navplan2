import {createAction, props} from '@ngrx/store';
import {Flightroute} from '../domain-model/flightroute';


export class FlightRouteActions {
    public static readonly read = createAction(
        '[Flightroute Page] Read flightroute',
        props<{ flightrouteId: number }>()
    );
    public static readonly readSuccess = createAction(
        '[FlightrouteEffects] Read flightroute success',
        props<{ flightroute: Flightroute }>()
    );
    public static readonly save = createAction(
        '[Flightroute Page] Save flightroute',
    );
    public static readonly saveDuplicate = createAction(
        '[Flightroute Page] Save flightroute duplicate',
    );
    public static readonly saveSuccess = createAction(
        '[FlightrouteEffects] Save flightroute success',
        props<{ flightroute: Flightroute }>()
    );
    public static readonly delete = createAction(
        '[Flightroute Page] Delete flightroute',
        props<{ flightrouteId: number }>()
    );
    public static readonly recalculated = createAction(
        '[FlightrouteEffects] Flightroute recalculated',
        props<{ newFlightroute: Flightroute }>()
    );
}
