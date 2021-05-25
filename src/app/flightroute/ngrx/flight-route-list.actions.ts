import {createAction, props} from '@ngrx/store';
import {FlightrouteListEntry} from '../domain-model/flightroute-list-entry';


export class FlightRouteListActions {
    public static readonly readList = createAction(
        '[FlightRoutePage] Read flight route list'
    );
    public static readonly showList = createAction(
        '[FlightRouteListEffects] Show flight route list',
        props<{ flightrouteList: FlightrouteListEntry[] }>()
    );
}
