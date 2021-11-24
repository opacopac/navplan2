import {createFeatureSelector} from '@ngrx/store';
import {ExporterState} from '../domain-model/exporter-state';


export const getExporterState = createFeatureSelector<ExporterState>('exporterState');
