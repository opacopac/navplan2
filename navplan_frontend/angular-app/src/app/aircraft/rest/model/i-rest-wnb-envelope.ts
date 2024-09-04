import {IRestWnbEnvelopeCoordinate} from './i-rest-wnb-envelope-coordinate';

export interface IRestWnbEnvelope {
    name: string;
    axisType: string;
    armDirection: string;
    coordinates: IRestWnbEnvelopeCoordinate[];
}
