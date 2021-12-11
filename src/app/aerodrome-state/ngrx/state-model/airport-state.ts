import {Extent2d} from '../../../common/geo-math/domain-model/geometry/extent2d';
import {ShortAirport} from '../../../aerodrome/domain-model/short-airport';


export interface AirportState {
    extent: Extent2d;
    zoom: number;
    airports: ShortAirport[];
}
