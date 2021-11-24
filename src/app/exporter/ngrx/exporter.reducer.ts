import {createReducer, on} from '@ngrx/store';
import {ExporterState} from '../domain-model/exporter-state';
import {ExporterActions} from './exporter.actions';


const initialState: ExporterState = {
    downloadUrl: undefined,
};


export const exporterReducer = createReducer(
    initialState,

    // FlightRouteListActions
    on(ExporterActions.exportExcel, (state, action) => ({
        ...state,
    })),
);
