import {createReducer, on} from '@ngrx/store';
import {ExporterState} from '../domain-model/exporter-state';
import {ExporterActions} from './exporter.actions';


const initialState: ExporterState = {
    filename: undefined,
    mimeType: undefined,
    relUrl: undefined,
};


export const exporterReducer = createReducer(
    initialState,
    on(ExporterActions.exportSuccess, (state, action) => ({
        ...state,
        filename: action.exportedFile.filename,
        relUrl: action.exportedFile.relUrl,
        mimeType: action.mimeType

    })),
);
