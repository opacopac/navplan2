import {createReducer, on} from '@ngrx/store';
import {ExporterState} from '../state-model/exporter-state';
import {ExporterActions} from './exporter.actions';


const initialState: ExporterState = {
    exportedFile: undefined
};


export const exporterReducer = createReducer(
    initialState,
    on(ExporterActions.exportSuccess, (state, action) => ({
        ...state,
        exportedFile: action.exportedFile,
    })),
);
