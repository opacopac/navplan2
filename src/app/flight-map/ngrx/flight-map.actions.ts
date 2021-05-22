import {createAction, props} from '@ngrx/store';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Notam} from '../../notam/domain-model/notam';


export class FlightMapActions {
    // map overlays
    public static readonly showOverlay = createAction(
        '[Flight Map] Show generic map overlay',
        props<{ dataItem: DataItem, clickPos: Position2d, metarTaf?: MetarTaf, notams: Notam[], tabIndex: number }>()
    );
    public static readonly closeAllOverlays = createAction(
        '[Flight Map] Close all map overlays action'
    );
}
