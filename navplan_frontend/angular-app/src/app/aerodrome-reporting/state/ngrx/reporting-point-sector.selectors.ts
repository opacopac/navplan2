import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ReportingPointSectorState} from '../state-model/reporting-point-sector-state';


export const getReportingPointSectorState = createFeatureSelector<ReportingPointSectorState>('reportingPointSectorState');
export const getReportingPoints = createSelector(getReportingPointSectorState, state => state.reportingPoints);
export const getReportingSectors = createSelector(getReportingPointSectorState, state => state.reportingSectors);
