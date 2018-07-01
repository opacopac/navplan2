import {MapState} from "./model/map-state";
import {Position2d} from "../model/geometry/position2d";
import {Angle} from "../model/quantities/angle";
import {AngleUnit} from "../services/utils/unitconversion.service";
import {MapActions} from "./map.actions";


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
