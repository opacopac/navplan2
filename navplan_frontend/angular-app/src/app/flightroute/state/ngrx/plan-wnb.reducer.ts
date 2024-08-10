import {createReducer, on} from '@ngrx/store';
import {AircraftListActions} from '../../../aircraft/state/ngrx/aircraft-list.actions';
import {PlanWnbState} from '../state-model/plan-wnb-state';
import {PlanWnbActions} from './plan-wnb.actions';
import {FuelType} from '../../../aircraft/domain/model/fuel-type';


const initialState: PlanWnbState = {
    weightItems: [],
    fuelType: FuelType.MOGAS
};


export const planWnbReducer = createReducer(
    initialState,

    // AircraftActions
    on(AircraftListActions.selectAircraftSuccess, (state, action) => {
        // TODO: set default values to weight items
        return {
            ...state,
            weightItems: action.aircraft.wnbWeightItems,
            fuelType: action.aircraft.fuelType ? action.aircraft.fuelType : state.fuelType
        };
    }),

    // Plan WnB Actions
    on(PlanWnbActions.weightOfItemChanged, (state, action) => {
        const newWeightItems = state.weightItems.map(wi => {
            if (wi === action.weightItem) {
                const newWeightItem = wi.clone();
                newWeightItem.weight = action.newWeight;
                // TODO: newWeightItem.fuel = action.newFuel;
                return  newWeightItem;
            } else {
                return wi;
            }
        });

        return {
            ...state,
            weightItems: newWeightItems
        };
    })
);
