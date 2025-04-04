import {Extent2d} from '../../../geo-physics/domain/model/geometry/extent2d';
import {ShortAirport} from '../../domain/model/short-airport';


export interface AirportState {
    extent: Extent2d;
    zoom: number;
    airports: ShortAirport[];
}
