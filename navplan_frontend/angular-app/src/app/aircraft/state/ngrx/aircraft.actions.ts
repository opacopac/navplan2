import {createAction, props} from '@ngrx/store';


export class AircraftActions {
    public static readonly selectAircraftTab = createAction(
        '[Aircraft Tabs] Select aircraft tab',
        props<{ selectedTab: string }>()
    );
}
