import {createFeatureSelector} from '@ngrx/store';
import {MeteoDwdState} from '../../meteo-dwd/domain-model/meteo-dwd-state';


export const getMeteoDwdState = createFeatureSelector<MeteoDwdState>('meteoDwdState');
