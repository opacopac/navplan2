import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavaidDomainModule} from '../domain/navaid-domain.module';
import {MapPopupNavaidHeaderComponent} from './ng-components/map-popup-navaid-header/map-popup-navaid-header.component';
import {
    MapPopupNavaidInfoTabComponent
} from './ng-components/map-popup-navaid-info-tab/map-popup-navaid-info-tab.component';
import {NavaidRestModule} from '../rest/navaid-rest.module';
import {NavaidStateModule} from '../state/navaid-state.module';
import {MatCardModule} from '@angular/material/card';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';
import {GeoPhysicsViewModule} from '../../geo-physics/view/geo-physics-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        NavaidDomainModule,
        NavaidRestModule,
        NavaidStateModule,
        GeoPhysicsDomainModule,
        GeoPhysicsViewModule,
    ],
    declarations: [
        MapPopupNavaidHeaderComponent,
        MapPopupNavaidInfoTabComponent,
    ],
    exports: [
        MapPopupNavaidHeaderComponent,
        MapPopupNavaidInfoTabComponent,
    ],
    providers: []
})
export class NavaidViewModule {
}
