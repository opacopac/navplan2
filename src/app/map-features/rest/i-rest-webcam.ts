import {IRestPosition2d} from '../../shared/model/rest/i-rest-position2d';


export interface IRestWebcam {
    id: number;
    name: string;
    url: string;
    pos?: IRestPosition2d;
}
