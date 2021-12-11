import {Airport} from '../../aerodrome/domain-model/airport';
import {IRestAirport} from './i-rest-airport';
import {Position2dConverter} from '../../common/geo-math/rest-model/position2d-converter';
import {RestLengthConverter} from '../../common/geo-math/rest-model/rest-length-converter';
import {RestAirportRadioConverter} from './rest-airport-radio-converter';
import {RestAirportRunwayConverter} from './rest-airport-runway-converter';
import {RestWebcamConverter} from '../../webcam-rest/rest-model/rest-webcam-converter';
import {RestAirportFeatureConverter} from './rest-airport-feature-converter';
import {AirportType} from '../../aerodrome/domain-model/airport-type';
import {RestAirportChartConverter} from './rest-airport-chart-converter';


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
        airport.charts = restItem.charts.map(restChart => RestAirportChartConverter.fromRest(restChart));
        airport.features = restItem.mapfeatures.map(restFeat => RestAirportFeatureConverter.fromRest(restFeat));

        return airport;
    }



    public static fromRestList(restAdList: IRestAirport[]): Airport[] {
        return restAdList.map(restAd => RestAirportConverter.fromRest(restAd));
    }
}
