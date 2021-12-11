import {createFeatureSelector} from '@ngrx/store';
import {ExporterState} from '../state-model/exporter-state';


export const getExporterState = createFeatureSelector<ExporterState>('exporterState');
