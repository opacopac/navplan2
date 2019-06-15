import {AirportChart} from '../domain/airport';
import {IRestAirportChart} from './i-rest-airport-chart';


export class RestAirportChart {
    public static fromRest(restItem: IRestAirportChart): AirportChart {
        return new AirportChart(
            restItem.id,
            restItem.source,
            restItem.type,
            restItem.filename,
            restItem.mercator_n,
            restItem.mercator_s,
            restItem.mercator_e,
            restItem.mercator_w
        );
    }
}
