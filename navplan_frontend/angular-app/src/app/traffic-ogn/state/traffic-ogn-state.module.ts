import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {OgnTrafficEffects} from './ngrx/ogn-traffic.effects';
import {TrafficOgnDomainModule} from '../domain/traffic-ogn-domain.module';
import {TrafficOgnRestModule} from '../rest/traffic-ogn-rest.module';


@NgModule({
    imports: [
        EffectsModule.forFeature([OgnTrafficEffects]),
        TrafficOgnDomainModule,
        TrafficOgnRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficOgnStateModule {
}
