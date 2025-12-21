import {RouteNotamActions} from './route-notam.actions';
import {createReducer, on} from '@ngrx/store';
import {RouteNotamState} from '../state-model/route-notam-state';
import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LengthUnit} from '../../../geo-physics/domain/model/quantities/length-unit';


const initialState: RouteNotamState = {
    maxNotamRadius: new Length(10, LengthUnit.NM),
    locationNotams: [],
};


export const routeNotamReducer = createReducer(
    initialState,

    on(RouteNotamActions.updateSuccess, (state, action) => ({
        ...state,
        locationNotams: action.locationNotams
    })),

    on(RouteNotamActions.maxRadiusChanged, (state, action) => ({
        ...state,
        maxNotamRadius: action.maxRadius
    })),
);
