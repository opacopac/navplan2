import {Action} from '@ngrx/store';
import {Webcam} from '../../webcam/domain-model/webcam';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Airspace} from '../../airspace/domain-model/airspace';
import {ShortAirport} from '../../airport/domain-model/short-airport';
import {AirportCircuit} from '../../airport/domain-model/airport-circuit';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {Airport} from '../../airport/domain-model/airport';


export enum FlightMapActionTypes {
    SHOW_AIRPORTS_ON_MAP = '[Flight Map] Show airports on map',
    SHOW_CIRCUITS_ON_MAP = '[Flight Map] Show airport circuits on map',
    SHOW_REPORTING_POINTS_ON_MAP = '[Flight Map] Show reporting points/sectors on map',
    SHOW_AIRSPACES_ON_MAP = '[Flight Map] Show airspaces on map',
    SHOW_NAVAIDS_ON_MAP = '[Flight Map] Show navaids on map',
    SHOW_WEBCAMS_ON_MAP = '[Flight Map] Show webcams on map',
    SHOW_AIRPORT_MAP_OVERLAY = '[Flight Map] Show airport map overlay',
    SHOW_REPORTING_POINT_MAP_OVERLAY = '[Flight Map] Show reporting point map overlay',
    SHOW_REPORTING_SECTOR_MAP_OVERLAY = '[Flight Map] Show reporting sector map overlay',
    CLOSE_ALL_OVERLAYS = '[Flight Map] Close all map overlays action',
    SHOW_AIRPORT_CHART_ON_MAP = '[Airport] Read airport chart',
}


// region map icons

export class ShowAirportsOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_AIRPORTS_ON_MAP;

    constructor(public airports: ShortAirport[]) {}
}


export class ShowAirportCircuitsOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_CIRCUITS_ON_MAP;

    constructor(public airportCircuits: AirportCircuit[]) {}
}


export class ShowReportingPointsOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_REPORTING_POINTS_ON_MAP;

    constructor(
        public reportingPoints: ReportingPoint[],
        public reportingSectors: ReportingSector[]
    ) {}
}


export class ShowAirspacesOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_AIRSPACES_ON_MAP;

    constructor(public airspaces: Airspace[]) {}
}


export class ShowNavaidsOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_NAVAIDS_ON_MAP;

    constructor(public navaids: Navaid[]) {}
}


export class ShowWebcamsOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_WEBCAMS_ON_MAP;

    constructor(public webcams: Webcam[]) {}
}

// endregion


// region map overlays

export class ShowAirportMapOverlayAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_AIRPORT_MAP_OVERLAY;

    constructor(public airport: Airport) {}
}

export class ShowReportingPointMapOverlayAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_REPORTING_POINT_MAP_OVERLAY;

    constructor(public reportingPoint: ReportingPoint) {}
}


export class ShowReportingSectorMapOverlayAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_REPORTING_SECTOR_MAP_OVERLAY;

    constructor(public reportingSector: ReportingSector) {}
}


export class CloseAllMapOverlaysAction implements Action {
    readonly type = FlightMapActionTypes.CLOSE_ALL_OVERLAYS;

    constructor() {}
}

// endregion


// region charts

export class ShowAirportChartOnMapAction implements Action {
    readonly type = FlightMapActionTypes.SHOW_AIRPORT_CHART_ON_MAP;

    constructor(public chartId: number) {}
}

// endregion



export type FlightMapActions =
    ShowAirportsOnMapAction |
    ShowAirportCircuitsOnMapAction |
    ShowReportingPointsOnMapAction |
    ShowAirspacesOnMapAction |
    ShowNavaidsOnMapAction |
    ShowWebcamsOnMapAction |
    ShowAirportMapOverlayAction |
    ShowReportingPointMapOverlayAction |
    ShowReportingSectorMapOverlayAction |
    CloseAllMapOverlaysAction |
    ShowAirportChartOnMapAction;
