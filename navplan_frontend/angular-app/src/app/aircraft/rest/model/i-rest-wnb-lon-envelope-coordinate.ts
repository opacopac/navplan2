import {IRestWeight} from '../../../geo-physics/rest/model/i-rest-weight';
import {IRestLength} from '../../../geo-physics/rest/model/i-rest-length';

export interface IRestWnbLonEnvelopeCoordinate {
    weight: IRestWeight;
    armCg: IRestLength;
}
