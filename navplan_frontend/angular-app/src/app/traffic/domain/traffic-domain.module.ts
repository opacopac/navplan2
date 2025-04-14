import {NgModule} from '@angular/core';
import {TrafficAdsbexDomainModule} from '../../traffic-adsbex/domain/traffic-adsbex-domain.module';
import {TrafficOgnDomainModule} from '../../traffic-ogn/domain/traffic-ogn-domain.module';
import {TrafficOpenskyDomainModule} from '../../traffic-opensky/domain/traffic-opensky-domain.module';
import {TrafficDetailsDomainModule} from '../../traffic-details/domain/traffic-details-domain.module';


@NgModule({
    imports: [
        TrafficAdsbexDomainModule,
        TrafficOgnDomainModule,
        TrafficOpenskyDomainModule,
        TrafficDetailsDomainModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficDomainModule {
}
