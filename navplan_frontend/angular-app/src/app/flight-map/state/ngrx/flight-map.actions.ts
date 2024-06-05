import {createAction, props} from '@ngrx/store';
import {DataItem} from '../../../common/model/data-item';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {MetarTaf} from '../../../metar-taf/domain/model/metar-taf';
import {Notam} from '../../../notam/domain/model/notam';
import {Waypoint} from '../../../flightroute/domain/model/waypoint';
import {MeteoLayer} from '../../domain/model/meteo-layer';


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

    public static readonly toggleFullScreen = createAction(
        '[FlightMapPage] Toggle full screen',
    );

    public static readonly toggleMeteoLayer = createAction(
        '[FlightMapPage] Toggle meteo layer',
    );

    public static readonly selectMeteoLayer = createAction(
        '[FlightMapPage] Select meteo layer',
        props<{ meteoLayer: MeteoLayer }>()
    );
}
