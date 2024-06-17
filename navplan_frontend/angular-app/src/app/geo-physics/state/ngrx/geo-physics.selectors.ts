import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GeoPhysicsState} from './geo-physics-state';


export const getGeoPhysicsState = createFeatureSelector<GeoPhysicsState>('geoPhysicsState');
export const getSelectedAltitudeUnit = createSelector(getGeoPhysicsState, state => state.altitudeUnit);
export const getSelectedDistanceUnit = createSelector(getGeoPhysicsState, state => state.distanceUnit);
export const getSelectedSpeedUnit = createSelector(getGeoPhysicsState, state => state.speedUnit);
export const getFuelUnit = createSelector(getGeoPhysicsState, state => state.fuelUnit);
