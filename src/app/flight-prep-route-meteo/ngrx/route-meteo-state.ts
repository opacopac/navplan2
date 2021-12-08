import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';


export interface RouteMeteoState {
    isVisible: boolean;
    extent: Extent2d;
    metarTafs: MetarTaf[];
}
