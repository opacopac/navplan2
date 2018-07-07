import {Position2d} from '../shared/model/geometry/position2d';
import {MapState} from './model/map-state';
import {Angle} from '../shared/model/quantities/angle';
import {MapActions} from './map.actions';
import {AngleUnit} from '../shared/model/units';


const initialState: MapState = {
    position: new Position2d(7.4971, 46.9141),
    zoom: 11,
    rotation: new Angle(0, AngleUnit.RAD),
    selectedWaypoint: undefined,
};


export function mapReducer(state: MapState = initialState, action: MapActions) {
    switch (action.type) {
        default:
            return state;
    }
}
