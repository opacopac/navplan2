import {NgModule} from '@angular/core';
import {OpenskyTrafficService} from './service/opensky-traffic.service';
import {TrafficDetailsService} from './service/traffic-details.service';
import {IOpenskyTrafficService} from '../domain/service/opensky-traffic/i-opensky-traffic-service';
import {ITrafficDetailsService} from '../domain/service/traffic-details/i-traffic-details-service';
import {TrafficAdsbexRestModule} from '../../traffic-adsbex/rest/traffic-adsbex-rest.module';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficOgnRestModule} from '../../traffic-ogn/rest/traffic-ogn-rest.module';


@NgModule({
    imports: [
        TrafficDomainModule,
        TrafficAdsbexRestModule,
        TrafficOgnRestModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IOpenskyTrafficService, useClass: OpenskyTrafficService},
        {provide: ITrafficDetailsService, useClass: TrafficDetailsService},
    ]
})
export class TrafficRestModule {
}
