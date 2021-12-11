import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnrouteModule} from '../enroute/enroute.module';
import {OlOverlayNavaidHeaderComponent} from './ng-components/ol-overlay-navaid-header/ol-overlay-navaid-header.component';
import {OlOverlayNavaidInfoTabComponent} from './ng-components/ol-overlay-navaid-info-tab/ol-overlay-navaid-info-tab.component';
import {EnrouteRestModule} from '../enroute-rest/enroute-rest.module';
import {EnrouteStateModule} from '../enroute-state/enroute-state.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        EnrouteModule,
        EnrouteRestModule,
        EnrouteStateModule
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
