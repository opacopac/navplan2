import {OpenAipItems} from '../domain/open-aip-items';
import {IRestOpenAipItems} from './i-rest-open-aip-items';
import {RestNavaid} from './rest-navaid';
import {RestWebcam} from './rest-webcam';
import {RestUserpoint} from './rest-userpoint';
import {RestAirspace} from './rest-airspace';
import {RestAirport} from './rest-airport';
import {RestReportingpoint} from './rest-reportingpoint';
import {RestReportingsector} from './rest-reportingsector';


export class RestOpenAipItems {
    public static fromRest(restResponse: IRestOpenAipItems): OpenAipItems {
        const mapFeatures = new OpenAipItems();
        mapFeatures.navaids = restResponse.navaids.map(restNavaid => RestNavaid.fromRest(restNavaid));
        mapFeatures.airports = restResponse.airports.map(restAd => RestAirport.fromRest(restAd));
        mapFeatures.airspaces = restResponse.airspaces.map(restAs => RestAirspace.fromRest(restAs));
        mapFeatures.userpoints = restResponse.userpoints.map(restUp => RestUserpoint.fromRest(restUp));
        mapFeatures.webcams = restResponse.webcams.map(restCam => RestWebcam.fromRest(restCam));
        mapFeatures.reportingpoints = restResponse.reportingpoints
            .filter(restRp => restRp.type === 'POINT')
            .map(restRp => RestReportingpoint.fromRest(restRp));
        mapFeatures.reportingsectors = restResponse.reportingpoints
            .filter(restRp => restRp.type === 'SECTOR')
            .map(restRp => RestReportingsector.fromRest(restRp));

        return mapFeatures;
    }
}
