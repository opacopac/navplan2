import {createAction, props} from '@ngrx/store';
import {AircraftListEntry} from '../../domain/model/aircraft-list-entry';
import {Aircraft} from '../../domain/model/aircraft';


export class AircraftActions {
    public static readonly readList = createAction(
        '[Aircraft Page] Read aircraft list'
    );

    public static readonly showList = createAction(
        '[Aircraft Effects] Show aircraft list',
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

    public static readonly createAircraft = createAction(
        '[Aircraft List] Create aircraft',
        props<{ aircraft: Aircraft }>()
    );

    public static readonly duplicateAircraft = createAction(
        '[Aircraft List] Duplicate aircraft',
        props<{ aircraftId: number }>()
    );

    public static readonly deleteAircraft = createAction(
        '[Aircraft List] Delete aircraft',
        props<{ aircraftId: number }>()
    );
}
