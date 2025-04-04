import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {AerodromeChartsDomainModule} from '../domain/aerodrome-charts-domain.module';
import {AerodromeChartsRestModule} from '../rest/aerodrome-charts-rest.module';
import {AerodromeChartsStateModule} from '../state/aerodrome-charts-state.module';
import {MapPopupAirportChartTabComponent} from './ng-components/map-popup-airport-chart-tab/map-popup-airport-chart-tab.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        AerodromeChartsDomainModule,
        AerodromeChartsRestModule,
        AerodromeChartsStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
    ],
    declarations: [
        MapPopupAirportChartTabComponent
    ],
    exports: [
        MapPopupAirportChartTabComponent
    ],
    providers: []
})
export class AerodromeChartsViewModule {
}
