import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnrouteDomainModule} from '../domain/enroute-domain.module';
import {
    OlOverlayNavaidHeaderComponent
} from './ng-components/ol-overlay-navaid-header/ol-overlay-navaid-header.component';
import {
    OlOverlayNavaidInfoTabComponent
} from './ng-components/ol-overlay-navaid-info-tab/ol-overlay-navaid-info-tab.component';
import {EnrouteRestModule} from '../rest/enroute-rest.module';
import {EnrouteStateModule} from '../state/enroute-state.module';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        EnrouteDomainModule,
        EnrouteRestModule,
        EnrouteStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
    ],
    declarations: [
        OlOverlayNavaidHeaderComponent,
        OlOverlayNavaidInfoTabComponent
    ],
    exports: [
        OlOverlayNavaidHeaderComponent,
        OlOverlayNavaidInfoTabComponent
    ],
    providers: [
    ]
})
export class EnrouteViewModule {}
