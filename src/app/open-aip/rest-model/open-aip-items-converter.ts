import {OpenAipItems} from '../domain-model/open-aip-items';
import {IRestOpenAipItems} from './i-rest-open-aip-items';
import {NavaidConverter} from './navaid-converter';
import {WebcamConverter} from './webcam-converter';
import {UserpointConverter} from './userpoint-converter';
import {AirspaceConverter} from './airspace-converter';
import {AirportConverter} from './airport-converter';
import {ReportingpointConverter} from './reportingpoint-converter';
import {ReportingsectorConverter} from './reportingsector-converter';
import {CircuitConverter} from '../../circuits/rest-model/circuit-converter';


export class OpenAipItemsConverter {
    public static fromRest(restResponse: IRestOpenAipItems): OpenAipItems {
        const openAipItems = new OpenAipItems();
        openAipItems.navaids = restResponse.navaids.map(restNavaid => NavaidConverter.fromRest(restNavaid));
        openAipItems.airports = restResponse.airports.map(restAd => AirportConverter.fromRest(restAd));
        openAipItems.airspaces = restResponse.airspaces.map(restAs => AirspaceConverter.fromRest(restAs));
        openAipItems.userpoints = restResponse.userpoints.map(restUp => UserpointConverter.fromRest(restUp));
        openAipItems.webcams = restResponse.webcams.map(restCam => WebcamConverter.fromRest(restCam));
        openAipItems.reportingpoints = restResponse.reportingpoints
            .filter(restRp => restRp.type === 'POINT')
            .map(restRp => ReportingpointConverter.fromRest(restRp));
        openAipItems.reportingsectors = restResponse.reportingpoints
            .filter(restRp => restRp.type === 'SECTOR')
            .map(restRp => ReportingsectorConverter.fromRest(restRp));
        openAipItems.circuits = restResponse.circuits.map(restCircuit => CircuitConverter.fromRest(restCircuit));

        return openAipItems;
    }
}
