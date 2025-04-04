import {NgModule} from '@angular/core';
import {IAirportService} from './service/i-airport.service';
import {AirportService} from './service/airport.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportService, useClass: AirportService},
    ]
})
export class AerodromeDomainModule {
}
