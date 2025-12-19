import {Length} from '../../../geo-physics/domain/model/quantities/length';
import {Notam} from '../../../notam/domain/model/notam';


export interface RouteNotamState {
    maxNotamRadius: Length;
    notams: Notam[];
}
