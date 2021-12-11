import {IRestLength} from '../../geo-physics-rest/rest-model/i-rest-length';


export interface IRestAirportRunway {
    name: string;
    surface: string;
    length: IRestLength;
    width: IRestLength;
    direction1: number;
    direction2: number;
    tora1: IRestLength;
    tora2: IRestLength;
    lda1: IRestLength;
    lda2: IRestLength;
    papi1: boolean;
    papi2: boolean;
}
