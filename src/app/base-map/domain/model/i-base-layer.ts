import {MapBaseLayerType} from './map-base-layer-type';

export interface IBaseLayer {
    getType(): MapBaseLayerType;
}
