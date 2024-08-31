import {createAction, props} from '@ngrx/store';
import {Aircraft} from '../../domain/model/aircraft';


export class AircraftCrudActions {
    public static readonly createNewAircraft = createAction(
        '[Aircraft List] Create aircraft',
        props<{ aircraft: Aircraft }>()
    );

    public static readonly saveAircraft = createAction(
        '[Aircraft Details/W&B/Performance] Save aircraft'
    );

    public static readonly saveAircraftSuccess = createAction(
        '[Aircraft Details/W&B/Performance] Save aircraft success',
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

    public static readonly deleteAircraftSuccess = createAction(
        '[Aircraft List] Delete aircraft success',
        props<{ aircraftId: number }>()
    );
}
