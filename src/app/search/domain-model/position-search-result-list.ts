import {Airspace} from '../../enroute/domain-model/airspace';
import {Notam} from '../../notam/domain-model/notam';
import {IPointSearchResult} from './i-point-search-result';
import {AirportSearchResult} from './airport-search-result';
import {NavaidSearchResult} from './navaid-search-result';
import {ReportingPointSearchResult} from './reporting-point-search-result';
import {UserPointSearchResult} from './user-point-search-result';
import {GeonameSearchResult} from './geoname-search-result';


export class PositionSearchResultList {
    public constructor(
        public airportResults: AirportSearchResult[],
        public navaidResults: NavaidSearchResult[],
        public reportingPointResults: ReportingPointSearchResult[],
        public userPointResults: UserPointSearchResult[],
        public geonameResults: GeonameSearchResult[],
        public airspaceResults: Airspace[],
        public notamResults: Notam[],
    ) {
    }


    public getPointResults(): IPointSearchResult[] {
        return [
            ...this.airportResults,
            ...this.navaidResults,
            ...this.reportingPointResults,
            ...this.userPointResults,
            ...this.geonameResults
        ];
    }


    public getAirspaceResults(): Airspace[] {
        return this.airspaceResults
            ? this.airspaceResults.slice().sort((a, b) => {
                return b.alt_bottom.getHeightAmsl().ft - a.alt_bottom.getHeightAmsl().ft; // TODO: use terrain elevation
            })
            : [];
    }
}
