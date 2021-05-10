import {IRestPosition2d} from '../../common/geo-math/rest-model/i-rest-position2d';


export interface IRestShortAirport {
    id: number;
    type: string;
    icao: string;
    pos: IRestPosition2d;
    rwy1dir: number;
    rwy1sfc: string;
    features: string[];
}
