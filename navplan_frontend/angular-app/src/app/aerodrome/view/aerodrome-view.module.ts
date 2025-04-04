import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapPopupAirportHeaderComponent} from './ng-components/map-popup-airport-header/map-popup-airport-header.component';
import {MapPopupAirportInfoTabComponent} from './ng-components/map-popup-airport-info-tab/map-popup-airport-info-tab.component';
import {MapPopupAirportRunwayTabComponent} from './ng-components/map-popup-airport-runway-tab/map-popup-airport-runway-tab.component';
import {MapPopupAirportRadioTabComponent} from './ng-components/map-popup-airport-radio-tab/map-popup-airport-radio-tab.component';
import {AerodromeDomainModule} from '../domain/aerodrome-domain.module';
import {AerodromeStateModule} from '../state/aerodrome-state.module';
import {AerodromeRestModule} from '../rest/aerodrome-rest.module';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {MetarTafViewModule} from '../../metar-taf/view/metar-taf-view.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        AerodromeDomainModule,
        AerodromeRestModule,
        AerodromeStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
        MetarTafViewModule,
        MatIconModule,
    ],
    declarations: [
        MapPopupAirportHeaderComponent,
        MapPopupAirportInfoTabComponent,
        MapPopupAirportRunwayTabComponent,
        MapPopupAirportRadioTabComponent,
    ],
    exports: [
        MapPopupAirportHeaderComponent,
        MapPopupAirportInfoTabComponent,
        MapPopupAirportRunwayTabComponent,
        MapPopupAirportRadioTabComponent,
    ],
    providers: []
})
export class AerodromeViewModule {
}
