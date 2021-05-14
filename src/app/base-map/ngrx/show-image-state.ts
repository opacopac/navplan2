import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';


export interface ShowImageState {
    imageId: number;
    imageUrl: string;
    extent: Extent2d;
    opacity: number;
    fitInView: boolean;
}
