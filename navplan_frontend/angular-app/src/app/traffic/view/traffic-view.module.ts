import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficRestModule} from '../rest/traffic-rest.module';
import {TrafficStateModule} from '../state/traffic-state.module';
import {OlOverlayTrafficComponent} from './ng-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './ng-components/traffic-button/traffic-button.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        TrafficDomainModule,
        TrafficRestModule,
        TrafficStateModule,
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
