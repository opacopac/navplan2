import {createReducer, on} from '@ngrx/store';
import {AircraftListActions} from '../../../aircraft/state/ngrx/aircraft-list.actions';
import {PlanWnbState} from '../state-model/plan-wnb-state';
import {PlanWnbActions} from './plan-wnb.actions';
import {FuelType} from '../../../aircraft/domain/model/fuel-type';
import {AircraftWnbService} from '../../../aircraft/domain/service/aircraft-wnb.service';


const initialState: PlanWnbState = {
    weightItems: [],
    fuelType: FuelType.MOGAS
};


export const planWnbReducer = createReducer(
    initialState,

    // Aircraft Actions
    on(AircraftListActions.selectAircraftSuccess, (state, action) => {
        const newWeightItems = AircraftWnbService.createWnbWeightItemsFromAircraft(action.aircraft);

        return {
            ...state,
            weightItems: newWeightItems,
            fuelType: action.aircraft.fuelType ? action.aircraft.fuelType : state.fuelType
        };
    }),

    // TODO: aircraft wnb updates

    // Plan WnB Actions
    on(PlanWnbActions.weightOfItemChanged, (state, action) => {
        const newWeightItems = state.weightItems.map(wi => {
            if (wi === action.weightItem) {
                const newWi = wi.clone();
                if (AircraftWnbService.isWeightTypeItem(newWi.type)) {
                    newWi.weight = action.newWeight;
                } else if (AircraftWnbService.isFuelTypeItem(newWi.type)) {
                    newWi.fuel = action.newFuel;
                    newWi.weight = AircraftWnbService.calcFuelWeight(newWi.fuel, state.fuelType);
                }
                return newWi;
            } else {
                return wi;
            }
        });
        AircraftWnbService.reCalcSummaryWeightItems(newWeightItems, state.fuelType);

        return {
            ...state,
            weightItems: newWeightItems
        };
    })
);
