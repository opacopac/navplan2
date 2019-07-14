import {NavMapState} from '../domain/nav-map-state';
import {navMapReducer} from './nav-map.reducer';
import {NavMapActivateAction} from './nav-map.actions';


describe('NavMapReducer', () => {
    let state: NavMapState;


    beforeEach(() => {
        state = { isActive: false };
    });


    it('activates the nav map upon NavMapActivateAction(true)', () => {
        state.isActive = false;
        const action = new NavMapActivateAction(true);

        const newState = navMapReducer(state, action);

        expect(newState.isActive).toEqual(true);
    });


    it('de activates the nav map upon NavMapActivateAction(false)', () => {
        state.isActive = true;
        const action = new NavMapActivateAction(false);

        const newState = navMapReducer(state, action);

        expect(newState.isActive).toEqual(false);
    });
});
