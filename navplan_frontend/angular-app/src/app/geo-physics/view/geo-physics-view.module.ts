import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../domain/geo-physics-domain.module';
import {MapOverlayVariationComponent} from './ng-components/map-overlay-variation/map-overlay-variation.component';
import {MapOverlayPositionComponent} from './ng-components/map-overlay-position/map-overlay-position.component';
import {MapOverlayElevationComponent} from './ng-components/map-overlay-elevation/map-overlay-elevation.component';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        GeoPhysicsDomainModule,
    ],
    declarations: [
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
    ],
    exports: [
        MapOverlayElevationComponent,
        MapOverlayPositionComponent,
        MapOverlayVariationComponent,
    ],
})
export class GeoPhysicsViewModule {
}
