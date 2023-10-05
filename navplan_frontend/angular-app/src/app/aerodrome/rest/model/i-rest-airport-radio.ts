import {IRestFrequency} from '../../../geo-physics/rest/model/i-rest-frequency';

export interface IRestAirportRadio {
    type: string;
    category: string;
    name: string;
    frequency: IRestFrequency;
}
