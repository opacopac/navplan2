import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {RestWeightConverter} from '../../../geo-physics/rest/model/rest-weight-converter';
import {WnbEnvelopeCoordinate} from '../../domain/model/wnb-envelope-coordinate';
import {IRestWnbEnvelopeCoordinate} from '../model/i-rest-wnb-envelope-coordinate';


export class RestWnbEnvelopeCoordinateConverter {
    public static fromRest(restCoordinate: IRestWnbEnvelopeCoordinate): WnbEnvelopeCoordinate {
        return new WnbEnvelopeCoordinate(
            RestWeightConverter.fromRest(restCoordinate.weight),
            RestLengthConverter.fromRest(restCoordinate.armCg),
        );
    }


    public static toRest(coordinate: WnbEnvelopeCoordinate): IRestWnbEnvelopeCoordinate {
        return {
            weight: RestWeightConverter.toRest(coordinate.weight),
            armCg: RestLengthConverter.toRest(coordinate.armCg)
        };
    }


    public static fromRestList(restCoordinates: IRestWnbEnvelopeCoordinate[]): WnbEnvelopeCoordinate[] {
        return restCoordinates.map(restCoordinate => RestWnbEnvelopeCoordinateConverter.fromRest(restCoordinate));
    }


    public static toRestList(coordinates: WnbEnvelopeCoordinate[]): IRestWnbEnvelopeCoordinate[] {
        return coordinates.map(coordinate => RestWnbEnvelopeCoordinateConverter.toRest(coordinate));
    }
}
