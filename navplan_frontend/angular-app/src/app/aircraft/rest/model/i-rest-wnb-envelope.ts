import {IRestWnbLonEnvelopeCoordinate} from './i-rest-wnb-lon-envelope-coordinate';
import {IRestWnbLatEnvelopeCoordinate} from './i-rest-wnb-lat-envelope-coordinate';


export interface IRestWnbEnvelope {
    name: string;
    axisType: string;
    lonEnvelope: IRestWnbLonEnvelopeCoordinate[];
    latEnvelope: IRestWnbLatEnvelopeCoordinate[];
}
