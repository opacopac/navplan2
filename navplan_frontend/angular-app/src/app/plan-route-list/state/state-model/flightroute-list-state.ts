import { FlightrouteListEntry } from '../../../flightroute/domain/model/flightroute-list-entry';
import {TableState} from '../../../common/state/model/table-state';


export interface FlightrouteListState {
    flightrouteList: FlightrouteListEntry[];
    flightrouteTableState: TableState;
}
