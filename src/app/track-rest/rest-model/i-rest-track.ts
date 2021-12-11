import {IRestPosition4d} from '../../geo-physics-rest/rest-model/i-rest-position4d';

export interface IRestTrack {
    id: number;
    savetime: number;
    name: string;
    positions: IRestPosition4d[];
}
