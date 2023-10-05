import {IRestPosition2d} from '../../../geo-physics/rest/model/i-rest-position2d';


export interface IRestGridDefinition {
    height: number;
    width: number;
    minpos: IRestPosition2d;
    steplat: number;
    steplon: number;
}
