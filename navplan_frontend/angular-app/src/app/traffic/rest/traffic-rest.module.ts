import {NgModule} from '@angular/core';
import {TrafficDetailsService} from './service/traffic-details.service';
import {ITrafficDetailsService} from '../domain/service/traffic-details/i-traffic-details-service';
import {TrafficAdsbexRestModule} from '../../traffic-adsbex/rest/traffic-adsbex-rest.module';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficOgnRestModule} from '../../traffic-ogn/rest/traffic-ogn-rest.module';
import {TrafficOpenskyRestModule} from '../../traffic-opensky/rest/traffic-opensky-rest.module';


@NgModule({
    imports: [
        TrafficDomainModule,
        TrafficAdsbexRestModule,
        TrafficOgnRestModule,
        TrafficOpenskyRestModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: ITrafficDetailsService, useClass: TrafficDetailsService},
    ]
})
export class TrafficRestModule {
}
