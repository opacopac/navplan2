import {NgModule} from '@angular/core';
import {AircraftWnbDomainModule} from '../domain/aircraft-wnb-domain.module';
import {AircraftWnbRestModule} from '../rest/aircraft-wnb-rest.module';


@NgModule({
    imports: [
        AircraftWnbDomainModule,
        AircraftWnbRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class AircraftWnbViewModule {
}
