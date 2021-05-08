import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';

export interface ChartState {
    chartId: number;
    chartUrl: string;
    extent: Extent2d;
}
