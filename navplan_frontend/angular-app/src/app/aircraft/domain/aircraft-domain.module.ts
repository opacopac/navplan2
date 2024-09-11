import {NgModule} from '@angular/core';
import {IAircraftService} from './service/i-aircraft.service';
import {AircraftService} from './service/aircraft.service';
import {AircraftTypeDesignatorService} from './service/aircraft-type-designator.service';
import {IAircraftTypeDesignatorService} from './service/i-aircraft-type-designator.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAircraftService, useClass: AircraftService},
        {provide: IAircraftTypeDesignatorService, useClass: AircraftTypeDesignatorService},
    ],
})
export class AircraftDomainModule {
}
