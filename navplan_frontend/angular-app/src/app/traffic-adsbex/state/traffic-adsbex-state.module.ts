import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AdsbexTrafficEffects} from './ngrx/adsbex-traffic.effects';
import {TrafficAdsbexRestModule} from '../rest/traffic-adsbex-rest.module';
import {TrafficAdsbexDomainModule} from '../domain/traffic-adsbex-domain.module';


@NgModule({
    imports: [
        EffectsModule.forFeature([AdsbexTrafficEffects]),
        TrafficAdsbexDomainModule,
        TrafficAdsbexRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficAdsbexStateModule {
}
