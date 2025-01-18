import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {IRestWnbLatEnvelopeCoordinate} from '../model/i-rest-wnb-lat-envelope-coordinate';
import {WnbLatEnvelopeCoordinate} from '../../domain/model/wnb-lat-envelope-coordinate';


export class RestWnbLatEnvelopeCoordinateConverter {
    public static fromRest(restCoordinate: IRestWnbLatEnvelopeCoordinate): WnbLatEnvelopeCoordinate {
        return new WnbLatEnvelopeCoordinate(
            RestLengthConverter.fromRest(restCoordinate.latArmCg),
            RestLengthConverter.fromRest(restCoordinate.lonArmCg),
        );
    }


    public static toRest(coordinate: WnbLatEnvelopeCoordinate): IRestWnbLatEnvelopeCoordinate {
        return {
            latArmCg: RestLengthConverter.toRest(coordinate.latArmCg),
            lonArmCg: RestLengthConverter.toRest(coordinate.lonArmCg)
        };
    }


    public static fromRestList(restCoordinates: IRestWnbLatEnvelopeCoordinate[]): WnbLatEnvelopeCoordinate[] {
        return restCoordinates.map(restCoordinate => RestWnbLatEnvelopeCoordinateConverter.fromRest(restCoordinate));
    }


    public static toRestList(coordinates: WnbLatEnvelopeCoordinate[]): IRestWnbLatEnvelopeCoordinate[] {
        return coordinates.map(coordinate => RestWnbLatEnvelopeCoordinateConverter.toRest(coordinate));
    }
}
