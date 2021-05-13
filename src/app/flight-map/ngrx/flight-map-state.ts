import {ShortAirport} from '../../airport/domain-model/short-airport';
import {AirportCircuit} from '../../airport/domain-model/airport-circuit';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {Airspace} from '../../airspace/domain-model/airspace';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Webcam} from '../../webcam/domain-model/webcam';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';


export interface FlightMapState {
    airports: ShortAirport[];
    airportCircuits: AirportCircuit[];
    reportingPoints: ReportingPoint[];
    reportingSector: ReportingSector[];
    airspaces: Airspace[];
    navaids: Navaid[];
    webcams: Webcam[];
    showOverlay: { dataItem: DataItem, clickPos: Position2d };
}
