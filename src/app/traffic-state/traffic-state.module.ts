import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {trafficReducer} from './ngrx/traffic.reducer';
import {TrafficEffects} from './ngrx/traffic.effects';
import {OgnTrafficEffects} from './ngrx/ogn-traffic.effects';
import {AdsbexTrafficEffects} from './ngrx/adsbex-traffic.effects';
import {OpenskyTrafficEffects} from './ngrx/opensky-traffic.effects';
import {TrafficDetailsEffects} from './ngrx/traffic-details.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('trafficState', trafficReducer),
        EffectsModule.forFeature([
            TrafficEffects,
            OgnTrafficEffects,
            AdsbexTrafficEffects,
            OpenskyTrafficEffects,
            TrafficDetailsEffects
        ]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class TrafficStateModule {}
