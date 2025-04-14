import {NgModule} from '@angular/core';
import {OgnTrafficService} from './service/ogn-traffic.service';
import {IOgnTrafficService} from '../domain/service/i-ogn-traffic-service';
import {TrafficOgnDomainModule} from '../domain/traffic-ogn-domain.module';


@NgModule({
    imports: [
        TrafficOgnDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IOgnTrafficService, useClass: OgnTrafficService},
    ]
})
export class TrafficOgnRestModule {
}
