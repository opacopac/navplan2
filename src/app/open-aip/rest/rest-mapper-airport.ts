import {Airport} from '../domain/airport';
import {IRestAirport} from './i-rest-airport';
import {RestPosition2d} from '../../geo-math/rest/rest-position2d';
import {RestLength} from '../../geo-math/rest/rest-length';
import {RestMapperAirportRadio} from './rest-mapper-airport-radio';
import {RestMapperAirportRunway} from './rest-mapper-airport-runway';
import {RestMapperWebcam} from './rest-mapper-webcam';
import {RestMapperAirportChart} from './rest-mapper-airport-chart';
import {RestMapperAirportFeature} from './rest-mapper-airport-feature';
import {AirportType} from '../domain/airport-type';


export class RestMapperAirport {
    public static fromRest(restItem: IRestAirport): Airport {
        const airport = new Airport(
            restItem.id,
            AirportType[restItem.type],
            restItem.name,
            restItem.icao,
            restItem.country,
            RestPosition2d.fromRest(restItem.pos),
            RestLength.fromRest(restItem.elevation)
        );
        airport.runways = restItem.runways.map(restRwy => RestMapperAirportRunway.fromRest(restRwy));
        airport.radios = restItem.radios.map(restRadio => RestMapperAirportRadio.fromRest(restRadio));
        airport.webcams = restItem.webcams.map(restCam => RestMapperWebcam.fromRest(restCam));
        airport.charts = restItem.charts.map(restChart => RestMapperAirportChart.fromRest(restChart));
        airport.features = restItem.mapfeatures.map(restFeat => RestMapperAirportFeature.fromRest(restFeat));

        return airport;
    }
}
