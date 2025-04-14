import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {OpenskyTrafficEffects} from './ngrx/opensky-traffic.effects';
import {TrafficOpenskyDomainModule} from '../domain/traffic-opensky-domain.module';
import {TrafficOpenskyRestModule} from '../rest/traffic-opensky-rest.module';


@NgModule({
    imports: [
        EffectsModule.forFeature([OpenskyTrafficEffects]),
        TrafficOpenskyDomainModule,
        TrafficOpenskyRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficOpenskyStateModule {
}
