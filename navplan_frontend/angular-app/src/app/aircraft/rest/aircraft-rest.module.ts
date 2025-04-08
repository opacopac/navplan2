import {NgModule} from '@angular/core';
import {IAircraftRepoService} from '../domain/service/i-aircraft-repo.service';
import {RestAircraftRepoService} from './service/rest-aircraft-repo.service';
import {IAircraftTypeDesignatorRepoService} from '../domain/service/i-aircraft-type-designator-repo.service';
import {RestAircraftTypeDesignatorRepoService} from './service/rest-aircraft-type-designator-repo.service';
import {AircraftDomainModule} from '../domain/aircraft-domain.module';


@NgModule({
    imports: [
        AircraftDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAircraftRepoService, useClass: RestAircraftRepoService},
        {provide: IAircraftTypeDesignatorRepoService, useClass: RestAircraftTypeDesignatorRepoService},
    ],
})
export class AircraftRestModule {
}
