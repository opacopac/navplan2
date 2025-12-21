import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {LocationNotam} from '../../domain/model/location-notam';


export interface RouteNotamState {
    maxNotamRadius: Length;
    locationNotams: LocationNotam[];
}
