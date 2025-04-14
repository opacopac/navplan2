import {NgModule} from '@angular/core';
import {TrafficDomainModule} from '../domain/traffic-domain.module';
import {TrafficStateModule} from '../state/traffic-state.module';
import {TrafficRestModule} from '../rest/traffic-rest.module';


@NgModule({
    imports: [
        TrafficDomainModule,
        TrafficRestModule,
        TrafficStateModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class TrafficViewModule {
}
