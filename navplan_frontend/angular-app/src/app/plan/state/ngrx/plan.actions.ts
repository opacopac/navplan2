import {createAction, props} from '@ngrx/store';


export class PlanActions {
    public static readonly selectPlanTab = createAction(
        '[Plan Tabs] Select plan tab',
        props<{ selectedPlanTab: string }>()
    );
}
