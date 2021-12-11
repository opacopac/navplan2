import {NgModule} from '@angular/core';
import {OgnTrafficService} from './rest-service/ogn-traffic.service';
import {AdsbexTrafficService} from './rest-service/adsbex-traffic.service';
import {OpenskyTrafficService} from './rest-service/opensky-traffic.service';
import {TrafficDetailsService} from './rest-service/traffic-details.service';
import {IOgnTrafficService} from '../traffic/domain-service/ogn-traffic/i-ogn-traffic-service';
import {IAdsbexTrafficService} from '../traffic/domain-service/adsbex-traffic/i-adsbex-traffic-service';
import {IOpenskyTrafficService} from '../traffic/domain-service/opensky-traffic/i-opensky-traffic-service';
import {ITrafficDetailsService} from '../traffic/domain-service/traffic-details/i-traffic-details-service';


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
