import {IRestExtent2d} from '../../../geo-physics/rest/model/i-rest-extent2d';


export interface IRestAirportChart2 {
    id: number;
    airport_icao: string;
    source: string;
    type: string;
    filename: string;
    extent: IRestExtent2d;
}
