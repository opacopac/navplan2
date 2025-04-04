import {NgModule} from '@angular/core';
import {IAirportCircuitService} from './service/i-airport-circuit.service';
import {AirportCircuitService} from './service/airport-circuit.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportCircuitService, useClass: AirportCircuitService},
    ]
})
export class AerodromeCircuitsDomainModule {
}
