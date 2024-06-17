import {createAction, props} from '@ngrx/store';
import {Flightroute} from '../../domain/model/flightroute';
import {Time} from '../../../geo-physics/domain/model/quantities/time';
import {Consumption} from '../../../geo-physics/domain/model/quantities/consumption';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';


export class FlightrouteActions {
    public static readonly update = createAction(
        '[FlightrouteCrudEffects] Update flight route',
        props<{ flightroute: Flightroute }>()
    );

    public static readonly updateAircraftSpeed = createAction(
        '[Flightroute Page] Update aircraft speed',
        props<{ aircraftSpeed: Speed }>()
    );

    public static readonly updateAircraftConsumption = createAction(
        '[Flightroute Page] Update aircraft consumption',
        props<{ aircraftConsumption: Consumption }>()
    );

    public static readonly updateExtraTime = createAction(
        '[Flightroute Page] Update extra time',
        props<{ extraTime: Time }>()
    );

    public static readonly updateTitle = createAction(
        '[Flightroute Page] Update flight route title',
        props<{ title: string }>()
    );

    public static readonly updateComments = createAction(
        '[Flightroute Page] Update flight route comments',
        props<{ comments: string }>()
    );

    public static readonly clear = createAction(
        '[ClearDialog] Clear flight route',
    );
}
