import {Airport} from '../../domain/model/airport';
import {IRestAirport} from '../model/i-rest-airport';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';
import {RestAirportRadioConverter} from './rest-airport-radio-converter';
import {RestAirportRunwayConverter} from './rest-airport-runway-converter';
import {RestWebcamConverter} from '../../../webcam/rest/model/rest-webcam-converter';
import {RestAirportFeatureConverter} from './rest-airport-feature-converter';
import {AirportType} from '../../domain/model/airport-type';
import {RestAirportChartConverter} from '../../../aerodrome-charts/rest/converter/rest-airport-chart-converter';
import {RestAltitudeConverter} from '../../../geo-physics/rest/model/rest-altitude-converter';


export class RestAirportConverter {
    public static fromRest(restItem: IRestAirport): Airport {
        const airport = new Airport(
            restItem.id,
            AirportType[restItem.type],
            restItem.name,
            restItem.icao,
            restItem.country,
            Position2dConverter.fromRest(restItem.pos),
            RestAltitudeConverter.fromRest(restItem.elevation)
        );
        airport.runways = restItem.runways.map(restRwy => RestAirportRunwayConverter.fromRest(restRwy));
        airport.radios = restItem.radios.map(restRadio => RestAirportRadioConverter.fromRest(restRadio));
        airport.webcams = restItem.webcams.map(restCam => RestWebcamConverter.fromRest(restCam));
        airport.charts = restItem.charts.map(restChart => RestAirportChartConverter.fromRest(restChart));
        airport.features = restItem.mapfeatures.map(restFeat => RestAirportFeatureConverter.fromRest(restFeat));

        return airport;
    }



    public static fromRestList(restAdList: IRestAirport[]): Airport[] {
        return restAdList.map(restAd => RestAirportConverter.fromRest(restAd));
    }
}
