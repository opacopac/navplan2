import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficRestModule} from '../rest/traffic-rest.module';
import {TrafficStateModule} from '../state/traffic-state.module';
import {OlOverlayTrafficComponent} from './ng-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './ng-components/traffic-button/traffic-button.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BaseMapViewModule} from '../../base-map/view/base-map-view.module';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        TrafficDomainModule,
        TrafficRestModule,
        TrafficStateModule,
        BaseMapViewModule,
    ],
    declarations: [
        OlOverlayTrafficComponent,
        TrafficButtonComponent
    ],
    exports: [
        OlOverlayTrafficComponent,
        TrafficButtonComponent
    ],
    providers: [
    ]
})
export class TrafficViewModule {}
