import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {MetarTaf} from '../../domain/model/metar-taf';


export class MetarTafActions {
    public static readonly readSuccess = createAction(
        '[MetarTafEffects] Read METAR/TAF success',
        props<{ extent: Extent2d, zoom: number, timestamp: number, metarTafs: MetarTaf[] }>()
    );
}
