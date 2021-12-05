import {createAction, props} from '@ngrx/store';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Notam} from '../../notam/domain-model/notam';


export class FlightMapActions {
    public static readonly showOverlay = createAction(
        '[FlightMapEffects] Show map overlay',
        props<{ dataItem: DataItem, clickPos: Position2d }>()
    );

    public static readonly showOverlaySuccess = createAction(
        '[FlightMapEffects] Show map overlay success',
        props<{ dataItem: DataItem, clickPos: Position2d, metarTaf?: MetarTaf, notams: Notam[], tabIndex: number }>()
    );

    public static readonly hideOverlay = createAction(
        '[FlightMapEffects] Hide map overlay',
    );

    public static readonly searchByPosition = createAction(
        '[FlightMapEffects] Search by position',
        props<{ position: Position2d }>()
    );
}
