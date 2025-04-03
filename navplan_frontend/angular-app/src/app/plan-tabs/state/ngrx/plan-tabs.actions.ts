import {createAction, props} from '@ngrx/store';


export class PlanTabsActions {
    public static readonly selectPlanTab = createAction(
        '[Plan Tabs] Select plan tab',
        props<{ selectedPlanTab: string }>()
    );
}
