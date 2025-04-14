import {NgModule} from '@angular/core';
import {TrafficAdsbexDomainModule} from '../../traffic-adsbex/domain/traffic-adsbex-domain.module';
import {TrafficOgnDomainModule} from '../../traffic-ogn/domain/traffic-ogn-domain.module';


@NgModule({
    imports: [
        TrafficAdsbexDomainModule,
        TrafficOgnDomainModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficDomainModule {
}
