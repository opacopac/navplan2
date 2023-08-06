import {createAction, props} from '@ngrx/store';
import {Position2d} from '../../../geo-physics/domain/model/geometry/position2d';
import {CloudMeteogram} from '../../domain/model/cloud-meteogram';


export class MeteoGramActions {
    public static readonly readCloudMeteogram = createAction(
        '[TBD] Read cloud meteogram',
        props<{ position: Position2d }>()
    );

    public static readonly readCloudMeteogramSuccess = createAction(
        '[MeteoDwdEffects] Read cloud meteogram success',
        props<{ cloudMeteogram: CloudMeteogram }>()
    );
}
