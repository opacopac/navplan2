import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {OgnTrafficService} from './rest/ogn/ogn-traffic.service';
import {OlOverlayTrafficComponent} from './ol-components/ol-overlay-traffic/ol-overlay-traffic.component';
import {TrafficButtonComponent} from './ng-components/traffic-button/traffic-button.component';
import {SharedModule} from '../common/shared.module';
import {trafficReducer} from './ngrx/traffic.reducer';
import {TrafficEffects} from './ngrx/traffic.effects';
import {TrafficState} from './ngrx/traffic-state';
import {TrafficActions} from './ngrx/traffic.actions';
import {BaseMapModule} from '../base-map/base-map.module';
import {TrafficDetailsService} from './rest/traffic-details/traffic-details.service';
import {AdsbexTrafficService} from './rest/adsbex/adsbex-traffic.service';
import {OpenskyTrafficService} from './rest/opensky/opensky-traffic.service';
import {OgnTrafficEffects} from './ngrx/ogn-traffic.effects';
import {AdsbexTrafficEffects} from './ngrx/adsbex-traffic.effects';
import {OpenskyTrafficEffects} from './ngrx/opensky-traffic.effects';
import {TrafficDetailsEffects} from './ngrx/traffic-details.effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<TrafficState, TrafficActions>('trafficState', trafficReducer),
        EffectsModule.forFeature([
            TrafficEffects,
            OgnTrafficEffects,
            AdsbexTrafficEffects,
            OpenskyTrafficEffects,
            TrafficDetailsEffects
        ]),
        SharedModule,
        BaseMapModule,
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
        OgnTrafficService,
        AdsbexTrafficService,
        OpenskyTrafficService,
        TrafficDetailsService,
    ]
})
export class TrafficModule {}
