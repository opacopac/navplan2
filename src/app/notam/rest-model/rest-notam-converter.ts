import {Notam} from '../domain-model/notam';
import {IRestNotam} from './i-rest-notam';
import {RestNotamGeometryConverter} from './rest-notam-geometry-converter';
import {NotamLocationType} from '../domain-model/notam-location-type';


export class RestNotamConverter {
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
            RestNotamGeometryConverter.fromRest(restNotam)
        );
    }
}
