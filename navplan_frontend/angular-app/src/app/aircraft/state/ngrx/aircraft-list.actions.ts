import {createAction, props} from '@ngrx/store';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';
import {TableState} from '../../../common/state/model/table-state';


export class AircraftListActions {
    public static readonly readList = createAction(
        '[Aircraft Page] Read aircraft list'
    );

    public static readonly readListSuccessful = createAction(
        '[Aircraft Effects] Read aircraft list successful',
        props<{ aircraftList: AircraftListEntry[] }>()
    );

    public static readonly selectAircraft = createAction(
        '[Aircraft List] Select aircraft',
        props<{ aircraftId: number }>()
    );

    public static readonly selectAircraftSuccess = createAction(
        '[Aircraft Effects] Select aircraft success',
        props<{ aircraft: Aircraft }>()
    );

    public static readonly editAircraft = createAction(
        '[Aircraft List] Edit aircraft',
        props<{ aircraftId: number }>()
    );

    public static readonly updateTableState = createAction(
        '[Aircraft List] Update table state',
        props<{ tableState: TableState }>()
    );

    public static readonly clearSelectedAircraft = createAction(
        '[ClearDialog] Clear selected aircraft'
    );
}
