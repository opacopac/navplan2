import {Altitude} from '../../../geo-physics/domain/model/geometry/altitude';
import {Angle} from '../../../geo-physics/domain/model/quantities/angle';
import {Speed} from '../../../geo-physics/domain/model/quantities/speed';


export class VerticalWindLevel {
    public constructor(
        public alt: Altitude,
        public direction: Angle,
        public speed: Speed
    ) {
    }
}
