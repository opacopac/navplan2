import {Action} from '@ngrx/store';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {AirportChart2} from '../domain-model/airport-chart2';
import {ShortAirport} from '../domain-model/short-airport';
import {ReportingPoint} from '../domain-model/reporting-point';
import {ReportingSector} from '../domain-model/reporting-sector';
import {AirportCircuit} from '../domain-model/airport-circuit';
import {Airport} from '../domain-model/airport';


export enum AirportActionTypes {
    READ_ADS_BY_EXTENT = '[Airport] Read airports by extent',
    READ_ADS_BY_EXTENT_SUCCESS = '[Airport] Read airports by extent SUCCESS',
    READ_ADS_BY_EXTENT_ERROR = '[Airport] Read airports by extent ERROR',
    READ_AD_BY_ID = '[Airport] Read airport by id',
    READ_AD_BY_ID_SUCCESS = '[Airport] Read airport by id SUCCESS',
    READ_AD_BY_ID_ERROR = '[Airport] Read airport by id ERROR',
    READ_AD_CIRCUITS_BY_EXTENT = '[Airport] Read airport circuits by extent',
    READ_AD_CIRCUITS_BY_EXTENT_SUCCESS = '[Airport] Read airport circuits by extent SUCCESS',
    READ_AD_CIRCUITS_BY_EXTENT_ERROR = '[Airport] Read airport circuits by extent ERROR',
    READ_REPORTING_POINTS_BY_EXTENT = '[Airport] Read reporting points by extent',
    READ_REPORTING_POINTS_BY_EXTENT_SUCCESS = '[Airport] Read reporting points by extent SUCCESS',
    READ_REPORTING_POINTS_BY_EXTENT_ERROR = '[Airport] Read reporting points by extent ERROR',
    READ_REPORTING_POINT_SUCCESS = '[Airport] Read reporting point SUCCESS',
    READ_REPORTING_SECTOR_SUCCESS = '[Airport] Read reporting sector SUCCESS',
    READ_AD_CHART_BY_ID = '[Airport] Read airport chart',
    READ_AD_CHART_BY_ID_SUCCESS = '[Airport] Read airport chart SUCCESS',
    READ_AD_CHART_BY_ID_ERROR = '[Airport] Read airport chart ERROR',
}


// region airport

export class ReadAirportsByExtentAction implements Action {
    readonly type = AirportActionTypes.READ_ADS_BY_EXTENT;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadAirportsByExtentSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_ADS_BY_EXTENT_SUCCESS;

    constructor(public airports: ShortAirport[]) {}
}


export class ReadAirportsByExtentErrorAction implements Action {
    readonly type = AirportActionTypes.READ_ADS_BY_EXTENT_ERROR;

    constructor(public error: Error) {}
}


export class ReadAirportByIdAction implements Action {
    readonly type = AirportActionTypes.READ_AD_BY_ID;

    constructor(public id: number) {}
}


export class ReadAirportByIdSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_AD_BY_ID_SUCCESS;

    constructor(public airport: Airport) {}
}


export class ReadAirportByIdErrorAction implements Action {
    readonly type = AirportActionTypes.READ_AD_BY_ID_ERROR;

    constructor(public error: Error) {}
}

// endregion


// region airport circuit

export class ReadAirportCircuitsByExtentAction implements Action {
    readonly type = AirportActionTypes.READ_AD_CIRCUITS_BY_EXTENT;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadAirportCircuitsByExtentSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_AD_CIRCUITS_BY_EXTENT_SUCCESS;

    constructor(public airportCircuits: AirportCircuit[]) {}
}


export class ReadAirportCircuitsByExtentErrorAction implements Action {
    readonly type = AirportActionTypes.READ_AD_CIRCUITS_BY_EXTENT_ERROR;

    constructor(public error: Error) {}
}

// endregion


// region reporting point

export class ReadReportingPointsByExtentAction implements Action {
    readonly type = AirportActionTypes.READ_REPORTING_POINTS_BY_EXTENT;

    constructor(
        public extent: Extent2d,
        public zoom: number
    ) {}
}


export class ReadReportingPointsByExtentSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_REPORTING_POINTS_BY_EXTENT_SUCCESS;

    constructor(
        public reportingPoints: ReportingPoint[],
        public reportingSectors: ReportingSector[]
    ) {}
}


export class ReadReportingPointsByExtentErrorAction implements Action {
    readonly type = AirportActionTypes.READ_REPORTING_POINTS_BY_EXTENT_ERROR;

    constructor(public error: Error) {}
}


export class ReadReportingPointSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_REPORTING_POINT_SUCCESS;

    constructor(public reportingPoint: ReportingPoint) {}
}


export class ReadReportingSectorSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_REPORTING_SECTOR_SUCCESS;

    constructor(public reportingSector: ReportingSector) {}
}


// endregion


// region airport chart

export class ReadAirportChartAction implements Action {
    readonly type = AirportActionTypes.READ_AD_CHART_BY_ID;

    constructor(public chartId: number) {}
}


export class ReadAirportChartSuccessAction implements Action {
    readonly type = AirportActionTypes.READ_AD_CHART_BY_ID_SUCCESS;

    constructor(public chart: AirportChart2) {}
}


export class ReadAirportChartErrorAction implements Action {
    readonly type = AirportActionTypes.READ_AD_CHART_BY_ID_ERROR;

    constructor(public error: Error) {}
}

// endregion


export type AirportActions =
    ReadAirportsByExtentAction |
    ReadAirportsByExtentSuccessAction |
    ReadAirportsByExtentErrorAction |
    ReadAirportByIdAction |
    ReadAirportByIdSuccessAction |
    ReadAirportByIdErrorAction |
    ReadReportingPointsByExtentAction |
    ReadReportingPointsByExtentSuccessAction |
    ReadReportingPointsByExtentErrorAction |
    ReadReportingPointSuccessAction |
    ReadReportingSectorSuccessAction |
    ReadAirportCircuitsByExtentAction |
    ReadAirportCircuitsByExtentSuccessAction |
    ReadAirportCircuitsByExtentErrorAction |
    ReadAirportChartAction |
    ReadAirportChartSuccessAction |
    ReadAirportChartErrorAction;
