import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';
import {IRestFrequency} from '../../../geo-physics/rest/model/i-rest-frequency';
import {IRestAltitude} from '../../../geo-physics/rest/model/i-rest-altitude';


export interface IRestNavaid {
    id: number;
    type: string;
    kuerzel: string;
    name: string;
    pos: IRestPosition2d;
    elevation: IRestAltitude;
    frequency: IRestFrequency;
    declination: number;
    truenorth: boolean;
}
