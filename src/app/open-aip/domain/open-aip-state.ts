import {OpenAipItems} from './open-aip-items';
import {Extent2d} from '../../shared/model/geometry/extent2d';


export interface OpenAipState {
    extent: Extent2d;
    zoom: number;
    openAipItems: OpenAipItems;
}
