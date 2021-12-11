import {IRestPosition2d} from '../../geo-physics-rest/rest-model/i-rest-position2d';


export interface IRestShortAirport {
    id: number;
    type: string;
    icao: string;
    pos: IRestPosition2d;
    rwy1dir: number;
    rwy1sfc: string;
    features: string[];
}
