import {IRestPosition2d} from '../../common/geo-math/rest-model/i-rest-position2d';


export interface IRestWebcam {
    id: number;
    name: string;
    url: string;
    pos?: IRestPosition2d;
}
