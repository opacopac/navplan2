import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';
import {
    MapOverlayAirspaceStructureComponent
} from './ng-components/map-overlay-airspace-structure/map-overlay-airspace-structure.component';
import {MapOverlayAirspaceComponent} from './ng-components/map-overlay-airspace/map-overlay-airspace.component';
import {AirspaceDomainModule} from '../domain/airspace-domain.module';
import {AirspaceRestModule} from '../rest/airspace-rest.module';
import {AirspaceStateModule} from '../state/airspace-state.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        AirspaceDomainModule,
        AirspaceRestModule,
        AirspaceStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
    ],
    declarations: [
        MapOverlayAirspaceComponent,
        MapOverlayAirspaceStructureComponent,
    ],
    exports: [
        MapOverlayAirspaceStructureComponent,
    ],
    providers: []
})
export class AirspaceViewModule {
}
