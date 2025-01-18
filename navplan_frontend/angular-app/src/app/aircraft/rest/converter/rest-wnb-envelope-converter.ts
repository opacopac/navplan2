import {WnbEnvelope} from '../../domain/model/wnb-envelope';
import {IRestWnbEnvelope} from '../model/i-rest-wnb-envelope';
import {RestWnbLonEnvelopeCoordinateConverter} from './rest-wnb-lon-envelope-coordinate-converter';
import {WnbEnvelopeAxisType} from '../../domain/model/wnb-envelope-axis-type';
import {RestWnbLatEnvelopeCoordinateConverter} from './rest-wnb-lat-envelope-coordinate-converter';


export class RestWnbEnvelopeConverter {
    public static fromRest(restEnvelope: IRestWnbEnvelope): WnbEnvelope {
        return new WnbEnvelope(
            restEnvelope.name,
            WnbEnvelopeAxisType[restEnvelope.axisType],
            RestWnbLonEnvelopeCoordinateConverter.fromRestList(restEnvelope.lonEnvelope),
            RestWnbLatEnvelopeCoordinateConverter.fromRestList(restEnvelope.latEnvelope)
        );
    }


    public static toRest(envelope: WnbEnvelope): IRestWnbEnvelope {
        return {
            name: envelope.name,
            axisType: WnbEnvelopeAxisType[envelope.axisType],
            lonEnvelope: RestWnbLonEnvelopeCoordinateConverter.toRestList(envelope.lonEnvelope),
            latEnvelope: RestWnbLatEnvelopeCoordinateConverter.toRestList(envelope.latEnvelope)
        };
    }


    public static fromRestList(restEnvelopes: IRestWnbEnvelope[]): WnbEnvelope[] {
        return restEnvelopes.map(restEnvelope => RestWnbEnvelopeConverter.fromRest(restEnvelope));
    }


    public static toRestList(envelopes: WnbEnvelope[]): IRestWnbEnvelope[] {
        return envelopes.map(envelope => RestWnbEnvelopeConverter.toRest(envelope));
    }
}
