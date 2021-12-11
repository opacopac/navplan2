import {UserPoint} from '../../user/domain-model/user-point';
import {IRestUserpoint} from './i-rest-userpoint';
import {Position2dConverter} from '../../common/geo-math/rest-model/position2d-converter';


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
