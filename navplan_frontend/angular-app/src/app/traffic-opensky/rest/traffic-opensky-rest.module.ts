import {NgModule} from '@angular/core';
import {TrafficOpenskyDomainModule} from '../domain/traffic-opensky-domain.module';
import {IOpenskyTrafficService} from '../domain/service/i-opensky-traffic-service';
import {OpenskyTrafficService} from './service/opensky-traffic.service';


@NgModule({
    imports: [
        TrafficOpenskyDomainModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IOpenskyTrafficService, useClass: OpenskyTrafficService},
    ]
})
export class TrafficOpenskyRestModule {
}
