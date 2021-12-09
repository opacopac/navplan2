import {createFeatureSelector} from '@ngrx/store';
import {MeteoSmaState} from '../../meteo-sma/domain-model/meteo-sma-state';


export const getMeteoSmaState = createFeatureSelector<MeteoSmaState>('meteoSmaState');
