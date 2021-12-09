import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';


export class MetarTafActions {
    public static readonly update = createAction(
        '[FlightMapEffects] Update METAR/TAF',
        props<{ extent: Extent2d, zoom: number }>()
    );


    public static readonly updateSuccess = createAction(
        '[MetarTafEffects] Update METAR/TAF success',
        props<{ extent: Extent2d, zoom: number, timestamp: number, metarTafs: MetarTaf[] }>()
    );
}
