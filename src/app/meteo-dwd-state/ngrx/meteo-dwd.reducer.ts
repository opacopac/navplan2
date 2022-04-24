import {MeteoDwdActions} from './meteo-dwd.actions';
import {createReducer, on} from '@ngrx/store';
import {MeteoDwdState} from '../../meteo-dwd/domain-model/meteo-dwd-state';
import {MeteoDwdButtonStatus} from '../../meteo-dwd/domain-model/meteo-dwd-button-status';


const initialState: MeteoDwdState = {
    buttonStatus: MeteoDwdButtonStatus.OFF,
    selectedInterval: 0
};


export const meteoDwdReducer = createReducer(
    initialState,
    on(MeteoDwdActions.open, (state, action) => ({
        ...state,
        buttonStatus: MeteoDwdButtonStatus.CURRENT,
    })),
    on(MeteoDwdActions.selectInterval, (state, action) => ({
        ...state,
        selectedInterval: action.interval,
    })),
    on(MeteoDwdActions.close, (state) => ({
        ...state,
        buttonStatus: MeteoDwdButtonStatus.OFF,
    })),
);
