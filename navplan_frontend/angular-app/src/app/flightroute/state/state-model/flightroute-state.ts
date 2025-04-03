import {Flightroute} from '../../domain/model/flightroute';
import {FlightrouteListEntry} from '../../domain/model/flightroute-list-entry';
import {TableState} from '../../../common/state/model/table-state';


export interface FlightrouteState {
    flightrouteList: FlightrouteListEntry[];
    flightroute: Flightroute;
    useAircraftSpeedValue: boolean;
    useAircraftConsumptionValue: boolean;
    flightrouteTableState: TableState;
}
