import {createReducer, on} from '@ngrx/store';
import {ReportingPointSectorActions} from './reporting-point-sector.actions';
import {ReportingPointSectorState} from '../state-model/reporting-point-sector-state';


const initialState: ReportingPointSectorState = {
    extent: undefined,
    zoom: undefined,
    reportingPoints: [],
    reportingSectors: [],
};


export const reportingPointSectorReducer = createReducer(
    initialState,
    on(ReportingPointSectorActions.updateSuccess, (state, action) => ({
        ...state,
        extent: action.extent,
        zoom: action.zoom,
        reportingPoints: action.reportingPoints,
        reportingSectors: action.reportingSectors
    })),
);
