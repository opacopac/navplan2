import {createAction, props} from '@ngrx/store';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Notam} from '../../../notam/domain/model/notam';


export class RouteNotamActions {
    public static readonly update = createAction(
        '[Route Notam Tab] Update Notams',
    );

    public static readonly updateSuccess = createAction(
        '[RouteNotamEffects] Update Notams success',
        props<{ notams: Notam[] }>()
    );

    public static readonly maxRadiusChanged = createAction(
        '[RouteNotamContainer] Max Radius Changed',
        props<{ maxRadius: Length }>()
    );
}
