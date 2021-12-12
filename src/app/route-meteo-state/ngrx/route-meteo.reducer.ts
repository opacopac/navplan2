import {RouteMeteoActions} from './route-meteo.actions';
import {createReducer, on} from '@ngrx/store';
import {RouteMeteoState} from '../state-model/route-meteo-state';
import {Length} from '../../geo-physics/domain-model/quantities/length';
import {LengthUnit} from '../../geo-physics/domain-model/quantities/length-unit';
import {RouteMetarTafs} from '../../route-meteo/domain-model/route-metar-tafs';


const initialState: RouteMeteoState = {
    maxMeteoRadius: new Length(30, LengthUnit.NM),
    routeMetarTafs: new RouteMetarTafs([], [], []),
};


export const routeMeteoReducer = createReducer(
    initialState,
    on(RouteMeteoActions.updateSuccess, (state, action) => ({
        ...state,
        routeMetarTafs: action.routeMetarTafs
    })),
);
