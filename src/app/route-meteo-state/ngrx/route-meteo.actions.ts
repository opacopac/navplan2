import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../geo-physics/domain-model/geometry/extent2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';


export class RouteMeteoActions {
    public static readonly isVisible = createAction(
        '[Route Meteo Tab] Update Metar/Tafs',
    );

    public static readonly update = createAction(
        '[Route Meteo Tab] Update Metar/Tafs',
    );

    public static readonly updateSuccess = createAction(
        '[RouteMeteoEffects] Update Metar/Tafs success',
        props<{ extent: Extent2d, metarTafList: MetarTaf[] }>()
    );
}
