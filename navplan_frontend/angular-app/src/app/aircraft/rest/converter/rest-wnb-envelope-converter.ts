import {WnbEnvelope} from '../../domain/model/wnb-envelope';
import {IRestWnbEnvelope} from '../model/i-rest-wnb-envelope';
import {RestWnbEnvelopeCoordinateConverter} from './rest-wnb-envelope-coordinate-converter';


export class RestWnbEnvelopeConverter {
    public static fromRest(restEnvelope: IRestWnbEnvelope): WnbEnvelope {
        return new WnbEnvelope(
            restEnvelope.name,
            RestWnbEnvelopeCoordinateConverter.fromRestList(restEnvelope.coordinates),
        );
    }


    public static toRest(envelope: WnbEnvelope): IRestWnbEnvelope {
        return {
            name: envelope.name,
            coordinates: RestWnbEnvelopeCoordinateConverter.toRestList(envelope.coordinates)
        };
    }


    public static fromRestList(restEnvelopes: IRestWnbEnvelope[]): WnbEnvelope[] {
        return restEnvelopes.map(restEnvelope => RestWnbEnvelopeConverter.fromRest(restEnvelope));
    }


    public static toRestList(envelopes: WnbEnvelope[]): IRestWnbEnvelope[] {
        return envelopes.map(envelope => RestWnbEnvelopeConverter.toRest(envelope));
    }
}
