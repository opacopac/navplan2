import {ShortAirport} from '../../airport/domain-model/short-airport';
import {AirportCircuit} from '../../airport/domain-model/airport-circuit';
import {ReportingSector} from '../../airport/domain-model/reporting-sector';
import {Airspace} from '../../airspace/domain-model/airspace';
import {Navaid} from '../../navaid/domain-model/navaid';
import {Webcam} from '../../webcam/domain-model/webcam';
import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {Extent2d} from '../../common/geo-math/domain-model/geometry/extent2d';
import {ReportingPoint} from '../../airport/domain-model/reporting-point';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Airport} from '../../airport/domain-model/airport';
import {Notam} from '../../notam/domain-model/notam';


export interface FlightMapState {
    airportState: {
        extent: Extent2d;
        zoom: number;
        airports: ShortAirport[]
    };
    airportCircuitState: {
        extent: Extent2d;
        zoom: number;
        airportCircuits: AirportCircuit[];
    };
    reportingPointSectorState: {
        extent: Extent2d;
        zoom: number;
        reportingPoints: ReportingPoint[];
        reportingSectors: ReportingSector[];
    };
    airspaceState: {
        extent: Extent2d;
        zoom: number;
        airspaces: Airspace[];
    };
    metarTafState: {
        extent: Extent2d;
        zoom: number;
        timestamp: number;
        metarTafs: MetarTaf[]
    };
    navaidState: {
        extent: Extent2d;
        zoom: number;
        navaids: Navaid[];
    };
    webcamState: {
        extent: Extent2d;
        zoom: number;
        webcams: Webcam[];
    };
    showAirportOverlay: {
        airport: Airport,
        metarTaf?: MetarTaf,
        notams: Notam[],
        tabIndex: number
    };
    showOverlay: {
        dataItem: DataItem,
        clickPos: Position2d
    };
}
