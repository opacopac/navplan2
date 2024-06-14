import {createAction, props} from '@ngrx/store';
import {AltitudeUnit} from '../../domain/model/geometry/altitude-unit';
import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {ConsumptionUnit} from '../../domain/model/quantities/consumption-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';


export class GeoPhysicsActions {
    public static readonly altitudeUnitSelected = createAction(
        '[UnitSettings] Select altitude unit',
        props<{ altitudeUnit: AltitudeUnit }>()
    );

    public static readonly distanceUnitSelected = createAction(
        '[UnitSettings] Select distance unit',
        props<{ distanceUnit: LengthUnit }>()
    );

    public static readonly speedUnitSelected = createAction(
        '[UnitSettings] Select speed unit',
        props<{ speedUnit: SpeedUnit }>()
    );

    public static readonly consumptionUnitSelected = createAction(
        '[UnitSettings] Select consumption unit',
        props<{ consumptionUnit: ConsumptionUnit }>()
    );
}
