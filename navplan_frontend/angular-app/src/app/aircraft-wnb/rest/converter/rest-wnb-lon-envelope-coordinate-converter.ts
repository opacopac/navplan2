import {RestLengthConverter} from '../../../geo-physics/rest/model/rest-length-converter';
import {RestWeightConverter} from '../../../geo-physics/rest/model/rest-weight-converter';
import {WnbLonEnvelopeCoordinate} from '../../domain/model/wnb-lon-envelope-coordinate';
import {IRestWnbLonEnvelopeCoordinate} from '../model/i-rest-wnb-lon-envelope-coordinate';


export class RestWnbLonEnvelopeCoordinateConverter {
    public static fromRest(restCoordinate: IRestWnbLonEnvelopeCoordinate): WnbLonEnvelopeCoordinate {
        return new WnbLonEnvelopeCoordinate(
            RestWeightConverter.fromRest(restCoordinate.weight),
            RestLengthConverter.fromRest(restCoordinate.armCg),
        );
    }


    public static toRest(coordinate: WnbLonEnvelopeCoordinate): IRestWnbLonEnvelopeCoordinate {
        return {
            weight: RestWeightConverter.toRest(coordinate.weight),
            armCg: RestLengthConverter.toRest(coordinate.armCg)
        };
    }


    public static fromRestList(restCoordinates: IRestWnbLonEnvelopeCoordinate[]): WnbLonEnvelopeCoordinate[] {
        return restCoordinates.map(restCoordinate => RestWnbLonEnvelopeCoordinateConverter.fromRest(restCoordinate));
    }


    public static toRestList(coordinates: WnbLonEnvelopeCoordinate[]): IRestWnbLonEnvelopeCoordinate[] {
        return coordinates.map(coordinate => RestWnbLonEnvelopeCoordinateConverter.toRest(coordinate));
    }
}
