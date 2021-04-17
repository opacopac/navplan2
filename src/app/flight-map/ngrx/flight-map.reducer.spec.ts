import {FlightMapState} from '../domain-model/flight-map-state';
import {flightMapReducer} from './flight-map.reducer';
import {FlightMapActivateAction} from './flight-map.actions';


describe('FlightMapReducer', () => {
    let state: FlightMapState;


    beforeEach(() => {
        state = { isActive: false };
    });


    it('activates the flight map upon FlightMapActivateAction(true)', () => {
        state.isActive = false;
        const action = new FlightMapActivateAction(true);

        const newState = flightMapReducer(state, action);

        expect(newState.isActive).toEqual(true);
    });


    it('de activates the flight map upon FlightMapActivateAction(false)', () => {
        state.isActive = true;
        const action = new FlightMapActivateAction(false);

        const newState = flightMapReducer(state, action);

        expect(newState.isActive).toEqual(false);
    });
});
