import {RouteMeteoActions} from './route-meteo.actions';
import {createReducer, on} from '@ngrx/store';
import {RouteMeteoState} from '../state-model/route-meteo-state';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';
import {RouteMetarTafSet} from '../../domain/model/route-metar-taf-set';


const initialState: RouteMeteoState = {
    maxMeteoRadius: new Length(25, LengthUnit.NM),
    routeMetarTafs: new RouteMetarTafSet([]),
};


export const routeMeteoReducer = createReducer(
    initialState,

    on(RouteMeteoActions.updateSuccess, (state, action) => ({
        ...state,
        routeMetarTafs: action.routeMetarTafs
    })),

    on(RouteMeteoActions.maxRadiusChanged, (state, action) => ({
        ...state,
        maxMeteoRadius: action.maxRadius
    })),
);
