import {OpenAipItems} from '../domain/open-aip-items';
import {IRestOpenAipItems} from './i-rest-open-aip-items';
import {RestMapperNavaid} from './rest-mapper-navaid';
import {RestMapperWebcam} from './rest-mapper-webcam';
import {RestMapperUserpoint} from './rest-mapper-userpoint';
import {RestMapperAirspace} from './rest-mapper-airspace';
import {RestMapperAirport} from './rest-mapper-airport';
import {RestMapperReportingpoint} from './rest-mapper-reportingpoint';
import {RestMapperReportingsector} from './rest-mapper-reportingsector';


export class RestMapperOpenAipItems {
    public static fromRest(restResponse: IRestOpenAipItems): OpenAipItems {
        const openAipItems = new OpenAipItems();
        openAipItems.navaids = restResponse.navaids.map(restNavaid => RestMapperNavaid.fromRest(restNavaid));
        openAipItems.airports = restResponse.airports.map(restAd => RestMapperAirport.fromRest(restAd));
        openAipItems.airspaces = restResponse.airspaces.map(restAs => RestMapperAirspace.fromRest(restAs));
        openAipItems.userpoints = restResponse.userpoints.map(restUp => RestMapperUserpoint.fromRest(restUp));
        openAipItems.webcams = restResponse.webcams.map(restCam => RestMapperWebcam.fromRest(restCam));
        openAipItems.reportingpoints = restResponse.reportingpoints
            .filter(restRp => restRp.type === 'POINT')
            .map(restRp => RestMapperReportingpoint.fromRest(restRp));
        openAipItems.reportingsectors = restResponse.reportingpoints
            .filter(restRp => restRp.type === 'SECTOR')
            .map(restRp => RestMapperReportingsector.fromRest(restRp));

        return openAipItems;
    }
}
