import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrafficModule} from '../traffic/traffic.module';
import {TrafficRestModule} from '../traffic-rest/traffic-rest.module';
import {TrafficStateModule} from '../traffic-state/traffic-state.module';
import {OlOverlayTrafficComponent} from './ng-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './ng-components/traffic-button/traffic-button.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule,
        TrafficModule,
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
