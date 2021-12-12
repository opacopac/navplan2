import {createAction, props} from '@ngrx/store';
import {Flightroute} from '../../flightroute/domain-model/flightroute';


export class FlightrouteActions {
    public static readonly update = createAction(
        '[FlightrouteCrudEffects] Update flight route',
        props<{ flightroute: Flightroute }>()
    );

    public static readonly updateAircraftSpeed = createAction(
        '[Flightroute Page] Update aircraft speed',
        props<{ aircraftSpeedValue: number }>()
    );

    public static readonly updateAircraftConsumption = createAction(
        '[Flightroute Page] Update aircraft consumption',
        props<{ aircraftConsumptionValue: number }>()
    );

    public static readonly updateExtraTime = createAction(
        '[Flightroute Page] Update extra time',
        props<{ extraTimeMinutesValue: number }>()
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
