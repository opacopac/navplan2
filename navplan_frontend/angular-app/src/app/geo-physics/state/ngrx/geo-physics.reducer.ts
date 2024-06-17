import {createReducer, on} from '@ngrx/store';
import {GeoPhysicsState} from './geo-physics-state';
import {GeoPhysicsActions} from './geo-physics.actions';
import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';


const initialState: GeoPhysicsState = {
    altitudeUnit: LengthUnit.FT,
    distanceUnit: LengthUnit.NM,
    speedUnit: SpeedUnit.KT,
    fuelUnit: VolumeUnit.L,
    consumptionUnit: ConsumptionUnit.L_PER_H
};


export const geoPhysicsReducer = createReducer(
    initialState,
    on(GeoPhysicsActions.altitudeUnitSelected, (state, action) => ({
        ...state,
        altitudeUnit: action.altitudeUnit
    })),

    on(GeoPhysicsActions.distanceUnitSelected, (state, action) => ({
        ...state,
        distanceUnit: action.distanceUnit
    })),

    on(GeoPhysicsActions.speedUnitSelected, (state, action) => ({
        ...state,
        speedUnit: action.speedUnit
    })),

    on(GeoPhysicsActions.fuelUnitSelected, (state, action) => ({
        ...state,
        fuelUnit: action.fuelUnit,
        consumptionUnit: action.fuelUnit === VolumeUnit.L ? ConsumptionUnit.L_PER_H : ConsumptionUnit.GAL_PER_H
    }))
);
