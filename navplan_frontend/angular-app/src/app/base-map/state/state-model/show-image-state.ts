import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';


export interface ShowImageState {
    imageId: number;
    imageUrl: string;
    extent: Extent2d;
    opacity: number;
    fitInView: boolean;
}
