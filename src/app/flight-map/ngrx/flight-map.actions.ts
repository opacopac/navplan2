import {createAction, props} from '@ngrx/store';
import {Webcam} from '../../webcam/domain-model/webcam';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Airspace} from '../../airspace/domain-model/airspace';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {AirportCircuit} from '../../airport/domain-model/airport-circuit';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Notam} from '../../notam/domain-model/notam';
import {Airport} from '../../airport/domain-model/airport';


export class FlightMapActions {
    // map icons
    public static readonly showAirports = createAction(
        '[Flight Map] Show airports on map',
        props<{ extent: Extent2d, zoom: number, airports: ShortAirport[] }>()
    );
    public static readonly showCircuits = createAction(
        '[Flight Map] Show airport circuits on map',
        props<{ extent: Extent2d, zoom: number, airportCircuits: AirportCircuit[] }>()
    );
    public static readonly showReportingPointsSectors = createAction(
        '[Flight Map] Show reporting points/sectors on map',
        props<{ extent: Extent2d, zoom: number, reportingPoints: ReportingPoint[], reportingSectors: ReportingSector[] }>()
    );
    public static readonly showAirspaces = createAction(
        '[Flight Map] Show airspaces on map',
        props<{ extent: Extent2d, zoom: number, airspaces: Airspace[] }>()
    );
    public static readonly showMetarTafs = createAction(
        '[Flight Map] Show metars/tafs on map',
        props<{ extent: Extent2d, zoom: number, timestamp: number, metarTafs: MetarTaf[] }>()
    );
    public static readonly showNavaids = createAction(
        '[Flight Map] Show navaids on map',
        props<{ extent: Extent2d, zoom: number, navaids: Navaid[] }>()
    );
    public static readonly showWebcams = createAction(
        '[Flight Map] Show webcams on map',
        props<{ extent: Extent2d, zoom: number, webcams: Webcam[] }>()
    );

    // map overlays
    public static readonly showAirportOverlay = createAction(
        '[Flight Map] Show airport map overlay',
        props<{ airport: Airport, metarTaf?: MetarTaf, notams: Notam[], tabIndex: number }>()
    );
    public static readonly showOverlay = createAction(
        '[Flight Map] Show generic map overlay',
        props<{ dataItem: DataItem, clickPos: Position2d }>()
    );
    public static readonly closeAllOverlays = createAction(
        '[Flight Map] Close all map overlays action'
    );

    // charts
    public static readonly showAirportChart = createAction(
        '[Flight Map] Show airport chart',
        props<{ chartId: number }>()
    );
}
