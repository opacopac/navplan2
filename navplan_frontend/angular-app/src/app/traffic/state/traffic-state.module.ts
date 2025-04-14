import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {trafficReducer} from './ngrx/traffic.reducer';
import {TrafficEffects} from './ngrx/traffic.effects';
import {OpenskyTrafficEffects} from './ngrx/opensky-traffic.effects';
import {TrafficDetailsEffects} from './ngrx/traffic-details.effects';
import {TrafficAdsbexStateModule} from '../../traffic-adsbex/state/traffic-adsbex-state.module';
import {TrafficOgnStateModule} from '../../traffic-ogn/state/traffic-ogn-state.module';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficRestModule} from '../rest/traffic-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('trafficState', trafficReducer),
        EffectsModule.forFeature([
            TrafficEffects,
            OpenskyTrafficEffects,
            TrafficDetailsEffects
        ]),
        TrafficDomainModule,
        TrafficRestModule,
        TrafficAdsbexStateModule,
        TrafficOgnStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficStateModule {
}
