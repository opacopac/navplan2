import {Airport} from '../../domain/model/airport';
import {IRestAirport} from './i-rest-airport';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';
import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {RestAirportRadioConverter} from './rest-airport-radio-converter';
import {RestAirportRunwayConverter} from './rest-airport-runway-converter';
import {RestWebcamConverter} from '../../../webcam/rest/model/rest-webcam-converter';
import {RestAirportFeatureConverter} from './rest-airport-feature-converter';
import {AirportType} from '../../domain/model/airport-type';
import {RestAirportChart2Converter} from './rest-airport-chart2-converter';


export class RestAirportConverter {
    public static fromRest(restItem: IRestAirport): Airport {
        const airport = new Airport(
            restItem.id,
            AirportType[restItem.type],
            restItem.name,
            restItem.icao,
            restItem.country,
            Position2dConverter.fromRest(restItem.pos),
            RestLengthConverter.fromRest(restItem.elevation)
        );
        airport.runways = restItem.runways.map(restRwy => RestAirportRunwayConverter.fromRest(restRwy));
        airport.radios = restItem.radios.map(restRadio => RestAirportRadioConverter.fromRest(restRadio));
        airport.webcams = restItem.webcams.map(restCam => RestWebcamConverter.fromRest(restCam));
        // airport.charts = restItem.charts.map(restChart => RestAirportChartConverter.fromRest(restChart));
        airport.charts = restItem.charts2.map(restChart => RestAirportChart2Converter.fromRest(restChart));
        airport.features = restItem.mapfeatures.map(restFeat => RestAirportFeatureConverter.fromRest(restFeat));

        return airport;
    }



    public static fromRestList(restAdList: IRestAirport[]): Airport[] {
        return restAdList.map(restAd => RestAirportConverter.fromRest(restAd));
    }
}
