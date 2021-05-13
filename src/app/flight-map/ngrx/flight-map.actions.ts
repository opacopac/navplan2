import {createAction, props} from '@ngrx/store';
import {Webcam} from '../../webcam/domain-model/webcam';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Airspace} from '../../airspace/domain-model/airspace';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {AirportCircuit} from '../../airport/domain-model/airport-circuit';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {Airport} from '../../airport/domain-model/airport';


export class FlightMapActions {
    // map icons
    public static readonly showAirports = createAction(
        '[Flight Map] Show airports on map',
        props<{ airports: ShortAirport[] }>()
    );
    public static readonly showCircuits = createAction(
        '[Flight Map] Show airport circuits on map',
        props<{ airportCircuits: AirportCircuit[] }>()
    );
    public static readonly showReportingPoints = createAction(
        '[Flight Map] Show reporting points/sectors on map',
        props<{ reportingPoints: ReportingPoint[], reportingSectors: ReportingSector[] }>()
    );
    public static readonly showAirspaces = createAction(
        '[Flight Map] Show airspaces on map',
        props<{ airspaces: Airspace[] }>()
    );
    public static readonly showNavaids = createAction(
        '[Flight Map] Show navaids on map',
        props<{ navaids: Navaid[] }>()
    );
    public static readonly showWebcams = createAction(
        '[Flight Map] Show webcams on map',
        props<{ webcams: Webcam[] }>()
    );

    // map overlays
    public static readonly showAirportOverlay = createAction(
        '[Flight Map] Show airport map overlay',
        props<{ airport: Airport }>()
    );
    public static readonly showReportingPointOverlay = createAction(
        '[Flight Map] Show reporting point map overlay',
        props<{ reportingPoint: ReportingPoint }>()
    );
    public static readonly showReportingSectorOverlay = createAction(
        '[Flight Map] Show reporting sector map overlay',
        props<{ reportingSector: ReportingSector }>()
    );
    public static readonly showNavaidOverlay = createAction(
        '[Flight Map] Show navaid map overlay',
        props<{ navaid: Navaid }>()
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
