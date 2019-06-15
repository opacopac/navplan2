import {Notam} from '../domain/notam';
import {IRestNotam} from './i-rest-notam';
import {RestNotamGeometry} from './rest-notam-geometry';
import {NotamLocationType} from '../domain/notam-location-type';


export class RestNotam {
    public static fromRest(restNotam: IRestNotam): Notam {
        return new Notam(
            restNotam.id,
            restNotam.notamid,
            restNotam.all,
            new Date(restNotam.startdate),
            new Date(restNotam.enddate),
            restNotam.created ? new Date(restNotam.created) : undefined,
            restNotam.location,
            restNotam.isicao,
            restNotam.key,
            NotamLocationType[restNotam.type],
            restNotam.statecode,
            restNotam.statename,
            restNotam.entity,
            restNotam.status,
            restNotam.qcode,
            restNotam.area,
            restNotam.subarea,
            restNotam.condition,
            restNotam.subject,
            restNotam.modifier,
            restNotam.message,
            RestNotamGeometry.fromRest(restNotam)
        );
    }
}
