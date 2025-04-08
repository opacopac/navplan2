import {NgModule} from '@angular/core';
import {AirportCircuitRestAdapterService} from './adapter/airport-circuit-rest-adapter.service';
import {IAirportCircuitRepoService} from '../domain/service/i-airport-circuit-repo.service';
import {AerodromeCircuitsDomainModule} from '../domain/aerodrome-circuits-domain.module';


@NgModule({
    imports: [
        AerodromeCircuitsDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportCircuitRepoService, useClass: AirportCircuitRestAdapterService},
    ]
})
export class AerodromeCircuitsRestModule {
}
