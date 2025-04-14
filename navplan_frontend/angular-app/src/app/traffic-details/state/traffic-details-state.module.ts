import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {TrafficDetailsEffects} from './ngrx/traffic-details.effects';
import {TrafficDetailsDomainModule} from '../domain/traffic-details-domain.module';
import {TrafficDetailsRestModule} from '../rest/traffic-details-rest.module';


@NgModule({
    imports: [
        EffectsModule.forFeature([TrafficDetailsEffects]),
        TrafficDetailsDomainModule,
        TrafficDetailsRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficDetailsStateModule {
}
