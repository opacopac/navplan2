import {OpenAipItems} from './open-aip-items';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export interface OpenAipState {
    extent: Extent2d;
    zoom: number;
    openAipItems: OpenAipItems;
    timestampMs: number;
}
