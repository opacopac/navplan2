import {createAction, props} from '@ngrx/store';
import {FlightrouteListEntry} from '../domain-model/flightroute-list-entry';


export class FlightRouteListActions {
    public static readonly readList = createAction(
        '[Flightroute] Read flightroute list'
    );
    public static readonly readListSuccess = createAction(
        '[FlightrouteService] Read flightroute list success',
        props<{ flightrouteList: FlightrouteListEntry[] }>()
    );
}
