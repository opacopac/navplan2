import {createAction, props} from '@ngrx/store';


export class AircraftCrudActions {
    public static readonly createNewAircraft = createAction(
        '[Aircraft List] Create aircraft'
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
