import {createFeatureSelector} from '@ngrx/store';
import {NavaidState} from './navaid-state';


export const getNavaidState = createFeatureSelector<NavaidState>('navaidState');
