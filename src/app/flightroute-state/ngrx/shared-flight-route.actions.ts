import {createAction, props} from '@ngrx/store';
import {Flightroute} from '../../flightroute/domain-model/flightroute';


export class SharedFlightRouteActions {
    public static readonly read = createAction(
        '[Flightroute Page] Read shared flightroute',
        props<{ shareId: string }>()
    );
    public static readonly show = createAction(
        '[FlightrouteEffects] Show shared flightroute',
        props<{ flightroute: Flightroute }>()
    );
    public static readonly save = createAction(
        '[Flightroute Page] Save shared flightroute',
    );
    public static readonly saveSuccess = createAction(
        '[FlightrouteEffects] Save shared flightroute success',
        props<{ shareId: string }>()
    );
    public static readonly hideUrl = createAction(
        '[Share flightroute URL dialog] Hide shared URL'
    );
}
