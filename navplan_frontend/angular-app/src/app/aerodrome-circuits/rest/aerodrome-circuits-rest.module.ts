import {NgModule} from '@angular/core';
import {AirportCircuitRestAdapterService} from './adapter/airport-circuit-rest-adapter.service';
import {IAirportCircuitRepoService} from '../domain/service/i-airport-circuit-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportCircuitRepoService, useClass: AirportCircuitRestAdapterService},
    ]
})
export class AerodromeCircuitsRestModule {
}
