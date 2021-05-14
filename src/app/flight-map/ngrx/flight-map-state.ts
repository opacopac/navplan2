import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Airport} from '../../airport/domain-model/airport';
import {Notam} from '../../notam/domain-model/notam';
import {MetarTafState} from '../../metar-taf/domain-model/metar-taf-state';
import {AirportState} from '../../airport/domain-model/airport-state';
import {AirportCircuitState} from '../../airport/domain-model/airport-circuit-state';
import {ReportingPointSectorState} from '../../airport/domain-model/reporting-point-sector-state';
import {NavaidState} from '../../navaid/domain-model/navaid-state';
import {WebcamState} from '../../webcam/domain-model/webcam-state';
import {AirspaceState} from '../../airspace/domain-model/airspace-state';
import {AirportChartState} from '../../airport/domain-model/airport-chart-state';


export interface FlightMapState {
    airportState: AirportState;
    airportChartState: AirportChartState;
    airportCircuitState: AirportCircuitState;
    reportingPointSectorState: ReportingPointSectorState;
    airspaceState: AirspaceState;
    metarTafState: MetarTafState;
    navaidState: NavaidState;
    webcamState: WebcamState;
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
