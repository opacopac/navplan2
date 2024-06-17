import {LengthUnit} from '../../domain/model/quantities/length-unit';
import {SpeedUnit} from '../../domain/model/quantities/speed-unit';
import {VolumeUnit} from '../../domain/model/quantities/volume-unit';


export interface GeoPhysicsState {
    altitudeUnit: LengthUnit;
    distanceUnit: LengthUnit;
    speedUnit: SpeedUnit;
    fuelUnit: VolumeUnit;
}
