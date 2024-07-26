import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../domain/geo-physics-domain.module';
import {MapOverlayVariationComponent} from './ng-components/map-overlay-variation/map-overlay-variation.component';
import {MapOverlayPositionComponent} from './ng-components/map-overlay-position/map-overlay-position.component';
import {MapOverlayElevationComponent} from './ng-components/map-overlay-elevation/map-overlay-elevation.component';
import {UnitSettingsComponent} from './ng-components/unit-settings/unit-settings.component';
import {MatRadioModule} from '@angular/material/radio';
import {GeoPhysicsStateModule} from '../state/geo-physics-state.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        GeoPhysicsDomainModule,
        GeoPhysicsStateModule,
        MatRadioModule,
    ],
    declarations: [
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
        UnitSettingsComponent,
    ],
    exports: [
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
        UnitSettingsComponent,
    ],
})
export class GeoPhysicsViewModule {
}
