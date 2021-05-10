import {ShortAirport} from '../../airport/domain-model/short-airport';
import {AirportCircuit} from '../../airport/domain-model/airport-circuit';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {Airport} from '../../airport/domain-model/airport';
import {Airspace} from '../../airspace/domain-model/airspace';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Webcam} from '../../webcam/domain-model/webcam';


export interface FlightMapState {
    airports: ShortAirport[];
    airportCircuits: AirportCircuit[];
    reportingPoints: ReportingPoint[];
    reportingSector: ReportingSector[];
    airspaces: Airspace[];
    navaids: Navaid[];
    webcams: Webcam[];
    showAirportOverlay: Airport;
    showReportingPointOverlay: ReportingPoint;
    showReportingSectorOverlay: ReportingSector;
}
