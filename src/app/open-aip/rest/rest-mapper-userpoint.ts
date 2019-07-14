import { Userpoint } from '../domain/userpoint';
import {IRestUserpoint} from './i-rest-userpoint';
import {RestPosition2d} from '../../geo-math/rest/rest-position2d';


export class RestMapperUserpoint {
    public static fromRest(restItem: IRestUserpoint): Userpoint {
        return new Userpoint(
            restItem.id,
            restItem.type,
            restItem.name,
            RestPosition2d.fromRest(restItem.pos),
            restItem.remark,
            restItem.supp_info
        );
    }
}
