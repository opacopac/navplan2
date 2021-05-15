import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Airport} from '../../aerodrome/domain-model/airport';
import {Notam} from '../../notam/domain-model/notam';
import {MetarTafState} from '../../metar-taf/domain-model/metar-taf-state';
import {AirportState} from '../../aerodrome/domain-model/airport-state';
import {AirportCircuitState} from '../../aerodrome/domain-model/airport-circuit-state';
import {ReportingPointSectorState} from '../../aerodrome/domain-model/reporting-point-sector-state';
import {NavaidState} from '../../enroute/domain-model/navaid-state';
import {WebcamState} from '../../webcam/domain-model/webcam-state';
import {AirspaceState} from '../../enroute/domain-model/airspace-state';
import {AirportChartState} from '../../aerodrome/domain-model/airport-chart-state';


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
