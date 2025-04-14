import {NgModule} from '@angular/core';
import {OgnTrafficService} from './service/ogn-traffic.service';
import {OpenskyTrafficService} from './service/opensky-traffic.service';
import {TrafficDetailsService} from './service/traffic-details.service';
import {IOgnTrafficService} from '../domain/service/ogn-traffic/i-ogn-traffic-service';
import {IOpenskyTrafficService} from '../domain/service/opensky-traffic/i-opensky-traffic-service';
import {ITrafficDetailsService} from '../domain/service/traffic-details/i-traffic-details-service';
import {TrafficAdsbexRestModule} from '../../traffic-adsbex/rest/traffic-adsbex-rest.module';
import {TrafficDomainModule} from '../domain/traffic-domain.module';


@NgModule({
    imports: [
        TrafficDomainModule,
        TrafficAdsbexRestModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IOgnTrafficService, useClass: OgnTrafficService},
        {provide: IOpenskyTrafficService, useClass: OpenskyTrafficService},
        {provide: ITrafficDetailsService, useClass: TrafficDetailsService},
    ]
})
export class TrafficRestModule {
}
