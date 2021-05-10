import {NavaidState} from './navaid-state';
import {NavaidActions} from './navaid-actions';


const initialState: NavaidState = {
    dummy: undefined
};


export function navaidReducer(state: NavaidState = initialState, action: NavaidActions) {
    switch (action.type) {
        default:
            return state;
    }
}
