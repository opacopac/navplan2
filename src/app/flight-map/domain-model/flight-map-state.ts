import {DataItem} from '../../common/model/data-item';
import {Position2d} from '../../common/geo-math/domain-model/geometry/position2d';
import {MetarTaf} from '../../metar-taf/domain-model/metar-taf';
import {Airport} from '../../aerodrome/domain-model/airport';
import {Notam} from '../../notam/domain-model/notam';


export interface FlightMapState {
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
