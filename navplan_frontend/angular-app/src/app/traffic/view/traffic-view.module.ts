import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficRestModule} from '../rest/traffic-rest.module';
import {TrafficStateModule} from '../state/traffic-state.module';
import {MapPopupTrafficComponent} from './ng-components/map-popup-traffic/map-popup-traffic.component';
import {TrafficButtonComponent} from './ng-components/traffic-button/traffic-button.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BaseMapViewModule} from '../../base-map/view/base-map-view.module';
import {StatusButtonComponent} from '../../common/view/ng-components/status-button/status-button.component';


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
        StatusButtonComponent,
    ],
    declarations: [
        MapPopupTrafficComponent,
        TrafficButtonComponent
    ],
    exports: [
        MapPopupTrafficComponent,
        TrafficButtonComponent
    ],
    providers: []
})
export class TrafficViewModule {
}
