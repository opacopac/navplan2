import {UserPoint} from '../../domain/model/user-point';
import {IRestUserpoint} from './i-rest-userpoint';
import {Position2dConverter} from '../../../geo-physics/rest/model/position2d-converter';


export class RestUserpointConverter {
    public static fromRest(restItem: IRestUserpoint): UserPoint {
        return new UserPoint(
            restItem.id,
            restItem.type,
            restItem.name,
            Position2dConverter.fromRest(restItem.pos),
            restItem.remark,
            restItem.supp_info
        );
    }
}
