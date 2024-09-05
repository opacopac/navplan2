import {createReducer, on} from '@ngrx/store';
import {GeoPhysicsState} from './geo-physics-state';
import {GeoPhysicsActions} from './geo-physics.actions';
import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';
import {WeightUnit} from '../../domain/model/quantities/weight-unit';
import {TemperatureUnit} from '../../domain/model/quantities/temperature-unit';


const initialState: GeoPhysicsState = {
    altitudeUnit: LengthUnit.FT,
    routeDistanceUnit: LengthUnit.NM,
    speedUnit: SpeedUnit.KT,
    volumeUnit: VolumeUnit.L,
    fuelConsumptionUnit: ConsumptionUnit.L_PER_H,
    weightUnit: WeightUnit.KG,
    wnbLengthUnit: LengthUnit.M,
    performanceDistanceUnit: LengthUnit.M,
    temperatureUnit: TemperatureUnit.C,
};


export const geoPhysicsReducer = createReducer(
    initialState,
    on(GeoPhysicsActions.altitudeUnitSelected, (state, action) => ({
        ...state,
        altitudeUnit: action.lengthUnit
    })),

    on(GeoPhysicsActions.routeDistanceUnitSelected, (state, action) => ({
        ...state,
        routeDistanceUnit: action.lengthUnit
    })),

    on(GeoPhysicsActions.speedUnitSelected, (state, action) => ({
        ...state,
        speedUnit: action.speedUnit
    })),

    on(GeoPhysicsActions.volumeUnitSelected, (state, action) => ({
        ...state,
        volumeUnit: action.volumeUnit,
        consumptionUnit: action.volumeUnit === VolumeUnit.L ? ConsumptionUnit.L_PER_H : ConsumptionUnit.GAL_PER_H
    })),

    on(GeoPhysicsActions.weightUnitSelected, (state, action) => ({
        ...state,
        weightUnit: action.weightUnit
    })),

    on(GeoPhysicsActions.wnbLengthUnitSelected, (state, action) => ({
        ...state,
        wnbLengthUnit: action.lengthUnit
    })),

    on(GeoPhysicsActions.performanceDistanceUnitSelected, (state, action) => ({
        ...state,
        performanceDistanceUnit: action.lengthUnit
    })),

    on(GeoPhysicsActions.temperatureUnitSelected, (state, action) => ({
        ...state,
        temperatureUnit: action.temperatureUnit
    }))
);
