import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';


export interface IRestAirportRunway {
    name: string;
    surface: string;
    length: IRestLength;
    width: IRestLength;
    direction: number;
    tora: IRestLength;
    lda: IRestLength;
    papi: boolean;
}
