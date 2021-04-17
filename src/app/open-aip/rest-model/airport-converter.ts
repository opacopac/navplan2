import {Airport} from '../domain-model/airport';
import {IRestAirport} from './i-rest-airport';
import {Position2dConverter} from '../../geo-math/rest-model/position2d-converter';
import {LengthConverter} from '../../geo-math/rest-model/length-converter';
import {AirportRadioConverter} from './airport-radio-converter';
import {AirportRunwayConverter} from './airport-runway-converter';
import {WebcamConverter} from './webcam-converter';
import {AirportChartConverter} from './airport-chart-converter';
import {AirportFeatureConverter} from './airport-feature-converter';
import {AirportType} from '../domain-model/airport-type';


export class AirportConverter {
    public static fromRest(restItem: IRestAirport): Airport {
        const airport = new Airport(
            restItem.id,
            AirportType[restItem.type],
            restItem.name,
            restItem.icao,
            restItem.country,
            Position2dConverter.fromRest(restItem.pos),
            LengthConverter.fromRest(restItem.elevation)
        );
        airport.runways = restItem.runways.map(restRwy => AirportRunwayConverter.fromRest(restRwy));
        airport.radios = restItem.radios.map(restRadio => AirportRadioConverter.fromRest(restRadio));
        airport.webcams = restItem.webcams.map(restCam => WebcamConverter.fromRest(restCam));
        airport.charts = restItem.charts.map(restChart => AirportChartConverter.fromRest(restChart));
        airport.features = restItem.mapfeatures.map(restFeat => AirportFeatureConverter.fromRest(restFeat));

        return airport;
    }
}
