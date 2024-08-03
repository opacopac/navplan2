import {createAction, props} from '@ngrx/store';
import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';
import {WeightUnit} from '../../domain/model/quantities/weight-unit';
import {TemperatureUnit} from '../../domain/model/quantities/temperature-unit';


export class GeoPhysicsActions {
    public static readonly altitudeUnitSelected = createAction(
        '[UnitSettings] Select altitude unit',
        props<{ lengthUnit: LengthUnit }>()
    );

    public static readonly routeDistanceUnitSelected = createAction(
        '[UnitSettings] Select route distance unit',
        props<{ lengthUnit: LengthUnit }>()
    );

    public static readonly speedUnitSelected = createAction(
        '[UnitSettings] Select speed unit',
        props<{ speedUnit: SpeedUnit }>()
    );

    public static readonly fuelUnitSelected = createAction(
        '[UnitSettings] Select fuel unit',
        props<{ fuelUnit: VolumeUnit }>()
    );

    public static readonly weightUnitSelected = createAction(
        '[UnitSettings] Select weight unit',
        props<{ weightUnit: WeightUnit }>()
    );

    public static readonly wnbLengthUnitSelected = createAction(
        '[UnitSettings] Select W&B length unit',
        props<{ lengthUnit: LengthUnit }>()
    );

    public static readonly performanceDistanceUnitSelected = createAction(
        '[UnitSettings] Select performance distance unit',
        props<{ lengthUnit: LengthUnit }>()
    );

    public static readonly temperatureUnitSelected = createAction(
        '[UnitSettings] Select temperature unit',
        props<{ temperatureUnit: TemperatureUnit }>()
    );
}
