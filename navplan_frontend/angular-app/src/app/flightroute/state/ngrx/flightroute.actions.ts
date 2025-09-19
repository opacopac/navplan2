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

    public static readonly updateCruiseSpeed = createAction(
        '[Flightroute Page] Update cruise speed',
        props<{ cruiseSpeed: Speed }>()
    );

    public static readonly updateUseAircraftSpeedValue = createAction(
        '[Flightroute Page] Update use aircraft speed value',
        props<{ useAircraftSpeed: boolean }>()
    );

    public static readonly updateCruiseConsumption = createAction(
        '[Flightroute Page] Update cruise consumption',
        props<{ cruiseConsumption: Consumption }>()
    );

    public static readonly updateUseAircraftConsumptionValue = createAction(
        '[Flightroute Page] Update use aircraft consumption value',
        props<{ useAircraftConsumption: boolean }>()
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

    public static readonly changed = createAction(
        '[Misc Effects] flight route changed',
        props<{ flightroute: Flightroute }>()
    );
}
