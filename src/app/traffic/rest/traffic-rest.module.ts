import {NgModule} from '@angular/core';
import {OgnTrafficService} from './service/ogn-traffic.service';
import {AdsbexTrafficService} from './service/adsbex-traffic.service';
import {OpenskyTrafficService} from './service/opensky-traffic.service';
import {TrafficDetailsService} from './service/traffic-details.service';
import {IOgnTrafficService} from '../domain/service/ogn-traffic/i-ogn-traffic-service';
import {IAdsbexTrafficService} from '../domain/service/adsbex-traffic/i-adsbex-traffic-service';
import {IOpenskyTrafficService} from '../domain/service/opensky-traffic/i-opensky-traffic-service';
import {ITrafficDetailsService} from '../domain/service/traffic-details/i-traffic-details-service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IOgnTrafficService, useClass: OgnTrafficService },
        { provide: IAdsbexTrafficService, useClass: AdsbexTrafficService },
        { provide: IOpenskyTrafficService, useClass: OpenskyTrafficService },
        { provide: ITrafficDetailsService, useClass: TrafficDetailsService },
    ]
})
export class TrafficRestModule {}
