import {createAction, props} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../domain-model/metar-taf';


export class MetarTafActions {
    public static readonly readMetarTafs = createAction(
        '[Flight Map] Read METAR/TAF by extent',
        props<{ extent: Extent2d, zoom: number }>()
    );
    public static readonly showMetarTafs = createAction(
        '[MetarTaffEffects] Show METAR/TAF on map',
        props<{ extent: Extent2d, zoom: number, timestamp: number, metarTafs: MetarTaf[] }>()
    );
}
