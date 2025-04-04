import {NgModule} from '@angular/core';
import {AirportRestAdapterService} from './adapter/airport-rest-adapter.service';
import {IAirportRepoService} from '../domain/service/i-airport-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirportRepoService, useClass: AirportRestAdapterService},
    ]
})
export class AerodromeRestModule {
}
