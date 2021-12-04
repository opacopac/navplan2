import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../domain-model/metar-taf';


export class MetarTafActions {
    public static readonly readMetarTafs = createAction(
        '[FlightMapEffects] Read METAR/TAF',
        props<{ extent: Extent2d, zoom: number }>()
    );


    public static readonly readMetarTafsSuccess = createAction(
        '[MetarTafEffects] Read METAR/TAF success',
        props<{ extent: Extent2d, zoom: number, timestamp: number, metarTafs: MetarTaf[] }>()
    );
}
