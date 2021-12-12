import {createAction, props} from '@ngrx/store';
import {RouteMetarTafs} from '../../route-meteo/domain-model/route-metar-tafs';


export class RouteMeteoActions {
    public static readonly isVisible = createAction(
        '[Route Meteo Tab] Update Metar/Tafs',
    );

    public static readonly update = createAction(
        '[Route Meteo Tab] Update Metar/Tafs',
    );

    public static readonly updateSuccess = createAction(
        '[RouteMeteoEffects] Update Metar/Tafs success',
        props<{ routeMetarTafs: RouteMetarTafs }>()
    );
}
