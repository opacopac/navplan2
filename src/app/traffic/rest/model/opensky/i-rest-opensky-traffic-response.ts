import {IRestOpenskyTraffic} from './i-rest-opensky-traffic';


// details: https://opensky-network.org/apidoc/rest.html
export interface IRestOpenskyTrafficResponse {
    time: number;
    states: IRestOpenskyTraffic[];
}
