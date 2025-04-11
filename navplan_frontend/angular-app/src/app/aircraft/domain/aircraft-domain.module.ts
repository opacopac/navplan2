import {NgModule} from '@angular/core';
import {IAircraftService} from './service/i-aircraft.service';
import {AircraftService} from './service/aircraft.service';
import {AircraftTypeDesignatorService} from './service/aircraft-type-designator.service';
import {IAircraftTypeDesignatorService} from './service/i-aircraft-type-designator.service';
import {AircraftPerformanceDomainModule} from '../../aircraft-performance/domain/aircraft-performance-domain.module';
import {AircraftWnbDomainModule} from '../../aircraft-wnb/domain/aircraft-wnb-domain.module';


@NgModule({
    imports: [
        AircraftPerformanceDomainModule,
        AircraftWnbDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAircraftService, useClass: AircraftService},
        {provide: IAircraftTypeDesignatorService, useClass: AircraftTypeDesignatorService},
    ],
})
export class AircraftDomainModule {
}
