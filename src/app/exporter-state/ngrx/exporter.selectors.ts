import {createFeatureSelector} from '@ngrx/store';
import {ExporterState} from '../../exporter/domain-model/exporter-state';


export const getExporterState = createFeatureSelector<ExporterState>('exporterState');
