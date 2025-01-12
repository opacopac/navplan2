import {createAction, props} from '@ngrx/store';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';


export class FlightrouteListActions {
    public static readonly readList = createAction(
        '[FlightRoutePage] Read flight route list'
    );
    public static readonly readListSuccess = createAction(
        '[FlightRouteListEffects] Read flight route list success',
        props<{ flightrouteList: FlightrouteListEntry[] }>()
    );
}
