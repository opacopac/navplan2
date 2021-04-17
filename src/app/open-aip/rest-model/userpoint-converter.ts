import {Userpoint} from '../domain-model/userpoint';
import {IRestUserpoint} from './i-rest-userpoint';
import {Position2dConverter} from '../../geo-math/rest-model/position2d-converter';


export class UserpointConverter {
    public static fromRest(restItem: IRestUserpoint): Userpoint {
        return new Userpoint(
            restItem.id,
            restItem.type,
            restItem.name,
            Position2dConverter.fromRest(restItem.pos),
            restItem.remark,
            restItem.supp_info
        );
    }
}
