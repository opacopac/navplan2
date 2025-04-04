import {createAction, props} from '@ngrx/store';
import {FlightrouteListEntry} from '../../../flightroute/domain/model/flightroute-list-entry';
import {TableState} from '../../../common/state/model/table-state';


export class FlightrouteListActions {
    public static readonly readList = createAction(
        '[FlightRoutePage] Read flight route list'
    );

    public static readonly readListSuccess = createAction(
        '[FlightRouteListEffects] Read flight route list success',
        props<{ flightrouteList: FlightrouteListEntry[] }>()
    );

    public static readonly updateTableState = createAction(
        '[Flightroute Page] Update table state',
        props<{ tableState: TableState }>()
    );
}
