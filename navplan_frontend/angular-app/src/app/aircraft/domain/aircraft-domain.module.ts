import {NgModule} from '@angular/core';
import {IAircraftService} from './service/i-aircraft.service';
import {AircraftService} from './service/aircraft.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAircraftService, useClass: AircraftService}
    ],
})
export class AircraftDomainModule {
}
