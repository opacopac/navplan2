import {createAction, props} from '@ngrx/store';
import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';


export class GeoPhysicsActions {
    public static readonly altitudeUnitSelected = createAction(
        '[UnitSettings] Select altitude unit',
        props<{ altitudeUnit: LengthUnit }>()
    );

    public static readonly distanceUnitSelected = createAction(
        '[UnitSettings] Select distance unit',
        props<{ distanceUnit: LengthUnit }>()
    );

    public static readonly speedUnitSelected = createAction(
        '[UnitSettings] Select speed unit',
        props<{ speedUnit: SpeedUnit }>()
    );

    public static readonly fuelUnitSelected = createAction(
        '[UnitSettings] Select fuel unit',
        props<{ fuelUnit: VolumeUnit }>()
    );
}
