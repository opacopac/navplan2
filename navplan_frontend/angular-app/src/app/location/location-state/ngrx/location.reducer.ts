import {LocationState} from '../state-model/location-state';
import {LocationActions} from './location.actions';
import {createReducer, on} from '@ngrx/store';
import {LocationServiceStatus} from '../../location-domain/model/location-service-status';


const initialState: LocationState = {
    status: LocationServiceStatus.OFF,
    isWatching: false,
    lastPositions: [],
    startTime: undefined,
    interimTime: undefined,
};


export const locationReducer = createReducer(
    initialState,
    on(LocationActions.startWatching, (state) => ({
        ...state,
        isWatching: true,
        lastPositions: [],
        status: LocationServiceStatus.WAITING
    })),
    on(LocationActions.stopWatching, (state) => ({
        ...state,
        isWatching: false,
        status: LocationServiceStatus.OFF
    })),
    on(LocationActions.readTimerSuccess, (state, action) => {
        if (state.isWatching) {
            const newLastPositions = state.lastPositions.slice();
            if (action.position) {
                newLastPositions.push(action.position);
            }
            return {
                ...state,
                lastPositions: newLastPositions,
                status: LocationServiceStatus.CURRENT
            };
        } else {
            return state;
        }
    }),
    on(LocationActions.readTimerError, (state) => {
        if (state.isWatching) {
            return {
                ...state,
                isWatching: false,
                status: LocationServiceStatus.ERROR
            };
        } else {
            return state;
        }
    }),
);
