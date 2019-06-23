import {Airport, AirportType} from '../domain/airport';
import {IRestAirport} from './i-rest-airport';
import {RestPosition2d} from '../../shared/model/rest/rest-position2d';
import {RestLength} from '../../shared/model/rest/rest-length';
import {RestAirportRadio} from './rest-airport-radio';
import {RestAirportRunway} from './rest-airport-runway';
import {RestWebcam} from './rest-webcam';
import {RestAirportChart} from './rest-airport-chart';
import {RestAirportFeature} from './rest-airport-feature';


export class RestAirport {
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
        airport.runways = restItem.runways.map(restRwy => RestAirportRunway.fromRest(restRwy));
        airport.radios = restItem.radios.map(restRadio => RestAirportRadio.fromRest(restRadio));
        airport.webcams = restItem.webcams.map(restCam => RestWebcam.fromRest(restCam));
        airport.charts = restItem.charts.map(restChart => RestAirportChart.fromRest(restChart));
        airport.features = restItem.mapfeatures.map(restFeat => RestAirportFeature.fromRest(restFeat));

        return airport;
    }
}
