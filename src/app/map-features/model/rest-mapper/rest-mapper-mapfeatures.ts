import {RestMapperWebcam, WebcamRestItem} from './rest-mapper-webcam';
import {NavaidRestItem, RestMapperNavaid} from './rest-mapper-navaid';
import {ReportingPointRestItem, RestMapperReportingpoint} from './rest-mapper-reportingpoint';
import {AirportRestItem, RestMapperAirport} from './rest-mapper-airport';
import {AirspaceRestItem, RestMapperAirspace} from './rest-mapper-airspace';
import {RestMapperUserpoint, UserPointRestItem} from './rest-mapper-userpoint';
import {Mapfeatures} from '../../model/mapfeatures';


export interface MapFeaturesResponse {
    navaids: NavaidRestItem[];
    airports: AirportRestItem[];
    airspaces: AirspaceRestItem[];
    reportingpoints: ReportingPointRestItem[];
    userpoints: UserPointRestItem[];
    webcams: WebcamRestItem[];
}


export class RestMapperMapfeatures {
    public static getMapFeaturesFromResponse(restResponse: MapFeaturesResponse): Mapfeatures {
        const mapFeatures = new Mapfeatures();

        // navaids
        for (const restItem of restResponse.navaids) {
            mapFeatures.navaids.push(RestMapperNavaid.getNavaidFromRestItem(restItem));
        }

        // airports
        for (const restItem of restResponse.airports) {
            mapFeatures.airports.push(RestMapperAirport.getAirportFromRestItem(restItem));
        }

        // airspaces
        for (const key in restResponse.airspaces) {
            mapFeatures.airspaces.push(RestMapperAirspace.getAirspaceFromRestItem(restResponse.airspaces[key]));
        }

        // reporting points
        for (const subRestItem of restResponse.reportingpoints) {
            switch (subRestItem.type) {
                case 'POINT':
                    mapFeatures.reportingpoints.push(RestMapperReportingpoint.getReportingpointFromRestItem(subRestItem));
                    break;
                case 'SECTOR':
                    mapFeatures.reportingsectors.push(RestMapperReportingpoint.getReportingSectorFromRestItem(subRestItem));
                    break;
            }
        }

        // user points
        for (const subRestItem of restResponse.userpoints) {
            mapFeatures.userpoints.push(RestMapperUserpoint.getUserpointFromRestItem(subRestItem));
        }

        // webcams
        for (const subRestItem of restResponse.webcams) {
            mapFeatures.webcams.push(RestMapperWebcam.getWebcamFromRestItem(subRestItem));
        }

        return mapFeatures;
    }
}
