import {NgModule} from '@angular/core';
import {FlightMapStateModule} from '../state/flight-map-state.module';
import {FlightMapDomainModule} from '../domain/flight-map-domain.module';
import {AerodromeViewModule} from '../../aerodrome/view/aerodrome-view.module';
import {NotamViewModule} from '../../notam/view/notam-view.module';
import {SearchViewModule} from '../../search/view/search-view.module';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {AirspaceViewModule} from '../../airspace/view/airspace-view.module';
import {VerticalMapViewModule} from '../../vertical-map/view/vertical-map-view.module';
import {AerodromeChartsViewModule} from '../../aerodrome-charts/view/aerodrome-charts-view.module';
import {AerodromeCircuitsViewModule} from '../../aerodrome-circuits/view/aerodrome-circuits-view.module';
import {AerodromeReportingViewModule} from '../../aerodrome-reporting/view/aerodrome-reporting-view.module';
import {MeteoSmaViewModule} from '../../meteo-sma/view/meteo-sma-view.module';
import {LocationViewModule} from '../../location/location-view/location-view.module';
import {MeteoDwdViewModule} from '../../meteo-dwd/view/meteo-dwd-view.module';
import {BaseMapViewModule} from '../../base-map/view/base-map-view.module';
import {NavaidViewModule} from '../../navaid/view/navaid-view.module';
import {WebcamViewModule} from '../../webcam/view/webcam-view.module';
import {MeteoGramViewModule} from '../../meteo-gram/view/meteo-gram-view.module';
import {FlightrouteViewModule} from '../../flightroute/view/flightroute-view.module';


@NgModule({
    declarations: [],
    imports: [
        FlightMapDomainModule,
        FlightMapStateModule,
        AerodromeViewModule,
        AerodromeChartsViewModule,
        AerodromeCircuitsViewModule,
        AerodromeReportingViewModule,
        AirspaceViewModule,
        BaseMapViewModule,
        FlightrouteViewModule,
        LocationViewModule,
        MetarTafViewModule,
        MeteoDwdViewModule,
        MeteoGramViewModule,
        MeteoSmaViewModule,
        NavaidViewModule,
        NotamViewModule,
        SearchViewModule,
        VerticalMapViewModule,
        WebcamViewModule,
    ],
    providers: []
})
export class FlightMapViewModule {
}
