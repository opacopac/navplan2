import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {trafficReducer} from './ngrx/traffic.reducer';
import {TrafficEffects} from './ngrx/traffic.effects';
import {OgnTrafficEffects} from './ngrx/ogn-traffic.effects';
import {AdsbexTrafficEffects} from '../../traffic-adsbex/state/ngrx/adsbex-traffic.effects';
import {OpenskyTrafficEffects} from './ngrx/opensky-traffic.effects';
import {TrafficDetailsEffects} from './ngrx/traffic-details.effects';
import {TrafficAdsbexStateModule} from '../../traffic-adsbex/state/traffic-adsbex-state.module';


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
        TrafficAdsbexStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficStateModule {
}
