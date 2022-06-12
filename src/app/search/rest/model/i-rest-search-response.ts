import {IRestAirport} from '../../../aerodrome/rest/model/i-rest-airport';
import {IRestNavaid} from '../../../enroute/rest/model/i-rest-navaid';
import {IRestAirspace} from '../../../enroute/rest/model/i-rest-airspace';
import {IRestReportingpoint} from '../../../aerodrome/rest/model/i-rest-reportingpoint';
import {IRestUserpoint} from '../../../user/rest/model/i-rest-userpoint';
import {IRestWebcam} from '../../../webcam/rest/model/i-rest-webcam';
import {IRestGeoname} from '../../../geoname/rest/model/i-rest-geoname';
import {IRestNotam} from '../../../notam/rest/model/i-rest-notam';
import {IRestAirportCircuit} from '../../../aerodrome/rest/model/i-rest-airport-circuit';


export interface IRestSearchResponse {
    airports: IRestAirport[];
    navaids: IRestNavaid[];
    airspaces: IRestAirspace[];
    reportingpoints: IRestReportingpoint[];
    userpoints: IRestUserpoint[];
    webcams: IRestWebcam[];
    geonames: IRestGeoname[];
    notams: IRestNotam[];
    circuits: IRestAirportCircuit[];
}
