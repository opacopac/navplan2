import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {MetarTaf} from '../../domain/model/metar-taf';


export interface MetarTafState {
    extent: Extent2d;
    zoom: number;
    timestamp: number;
    metarTafs: MetarTaf[];
}
