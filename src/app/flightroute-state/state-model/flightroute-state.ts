import {Flightroute} from '../../flightroute/domain-model/flightroute';
import {LengthUnit} from '../../geo-physics/domain-model/quantities/length-unit';
import {SpeedUnit} from '../../geo-physics/domain-model/quantities/speed-unit';
import {VolumeUnit} from '../../geo-physics/domain-model/quantities/volume-unit';
import {ConsumptionUnit} from '../../geo-physics/domain-model/quantities/consumption-unit';
import {FlightrouteListEntry} from '../../flightroute/domain-model/flightroute-list-entry';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    showShareId: string;
    distanceUnit: LengthUnit;
    altitudeUnit: LengthUnit;
    speedUnit: SpeedUnit;
    fuelUnit: VolumeUnit;
    consumptionUnit: ConsumptionUnit;
}
