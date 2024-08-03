import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GeoPhysicsState} from './geo-physics-state';


export const getGeoPhysicsState = createFeatureSelector<GeoPhysicsState>('geoPhysicsState');
export const getAltitudeUnit = createSelector(getGeoPhysicsState, state => state.altitudeUnit);
export const getRouteDistanceUnit = createSelector(getGeoPhysicsState, state => state.routeDistanceUnit);
export const getSpeedUnit = createSelector(getGeoPhysicsState, state => state.speedUnit);
export const getFuelUnit = createSelector(getGeoPhysicsState, state => state.fuelUnit);
export const getConsumptionUnit = createSelector(getGeoPhysicsState, state => state.fuelConsumptionUnit);
export const getWnbLengthUnit = createSelector(getGeoPhysicsState, state => state.wnbLengthUnit);
export const getWeightUnit = createSelector(getGeoPhysicsState, state => state.weightUnit);
export const getTemperatureUnit = createSelector(getGeoPhysicsState, state => state.temperatureUnit);
export const getPerformanceDistanceUnit = createSelector(getGeoPhysicsState, state => state.performanceDistanceUnit);
