import {Notam} from '../../../notam/domain/model/notam';
import {NotamLocationType} from '../../../notam/domain/model/notam-location-type';


export interface LocationNotam {
    locationIcao: string;
    locationName: string;
    locationType: NotamLocationType;
    notams: Notam[];
}
