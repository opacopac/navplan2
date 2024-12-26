import {createAction, props} from '@ngrx/store';


export class PlanPerfActions {
    public static readonly selectRunway = createAction(
        '[Plan Performance Tab] Select Runway',
        props<{ runwayIndex: number }>()
    );
}
