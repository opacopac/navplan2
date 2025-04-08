import {NgModule} from '@angular/core';
import {AirportRestAdapterService} from './adapter/airport-rest-adapter.service';
import {IAirportRepoService} from '../domain/service/i-airport-repo.service';
import {AerodromeDomainModule} from '../domain/aerodrome-domain.module';


@NgModule({
    imports: [
        AerodromeDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportRepoService, useClass: AirportRestAdapterService},
    ]
})
export class AerodromeRestModule {
}
