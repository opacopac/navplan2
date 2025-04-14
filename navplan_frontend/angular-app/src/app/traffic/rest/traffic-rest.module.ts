import {NgModule} from '@angular/core';
import {TrafficAdsbexRestModule} from '../../traffic-adsbex/rest/traffic-adsbex-rest.module';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficOgnRestModule} from '../../traffic-ogn/rest/traffic-ogn-rest.module';
import {TrafficOpenskyRestModule} from '../../traffic-opensky/rest/traffic-opensky-rest.module';
import {TrafficDetailsRestModule} from '../../traffic-details/rest/traffic-details-rest.module';


@NgModule({
    imports: [
        TrafficDomainModule,
        TrafficAdsbexRestModule,
        TrafficOgnRestModule,
        TrafficOpenskyRestModule,
        TrafficDetailsRestModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficRestModule {
}
