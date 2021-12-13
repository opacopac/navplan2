import {createAction, props} from '@ngrx/store';
import {RouteMetarTafSet} from '../../route-meteo/domain-model/route-metar-taf-set';
import {Length} from '../../geo-physics/domain-model/quantities/length';


export class RouteMeteoActions {
    public static readonly isVisible = createAction(
        '[Route Meteo Tab] Update Metar/Tafs',
    );

    public static readonly update = createAction(
        '[Route Meteo Tab] Update Metar/Tafs',
    );

    public static readonly updateSuccess = createAction(
        '[RouteMeteoEffects] Update Metar/Tafs success',
        props<{ routeMetarTafs: RouteMetarTafSet }>()
    );

    public static readonly maxRadiusChanged = createAction(
        '[RouteMeteoContainer] Max Radius Changed',
        props<{ maxRadius: Length }>()
    );
}
