import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';


export interface IRestNavaid {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    pos: IRestPosition2d;
    elevation: IRestLength;
    frequency: string;
    unit: string;
    declination: number;
    truenorth: boolean;
}
