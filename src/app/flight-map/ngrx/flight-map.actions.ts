import {createAction, props} from '@ngrx/store';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Notam} from '../../notam/domain-model/notam';
import {Waypoint} from '../../flightroute/domain-model/waypoint';


export class FlightMapActions {
    public static readonly showOverlay = createAction(
        '[FlightMapEffects] Show map overlay',
        props<{ dataItem: DataItem, clickPos: Position2d }>()
    );

    public static readonly showOverlaySuccess = createAction(
        '[FlightMapEffects] Show map overlay success',
        props<{ dataItem: DataItem, waypoints: Waypoint[], clickPos: Position2d, metarTaf?: MetarTaf, notams: Notam[], tabIndex: number }>()
    );

    public static readonly hideOverlay = createAction(
        '[FlightMapEffects] Hide map overlay',
    );
}
