import {NgModule} from '@angular/core';
import {TrafficDetailsService} from './service/traffic-details.service';
import {ITrafficDetailsService} from '../domain/service/i-traffic-details-service';
import {TrafficDetailsDomainModule} from '../domain/traffic-details-domain.module';


@NgModule({
    imports: [
        TrafficDetailsDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: ITrafficDetailsService, useClass: TrafficDetailsService},
    ]
})
export class TrafficDetailsRestModule {
}
