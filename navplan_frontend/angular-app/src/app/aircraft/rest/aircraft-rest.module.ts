import {NgModule} from '@angular/core';
import {IAircraftRepoService} from '../domain/service/i-aircraft-repo.service';
import {RestAircraftRepoService} from './service/rest-aircraft-repo.service';
import {IAircraftTypeDesignatorRepoService} from '../domain/service/i-aircraft-type-designator-repo.service';
import {RestAircraftTypeDesignatorRepoService} from './service/rest-aircraft-type-designator-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAircraftRepoService, useClass: RestAircraftRepoService},
        {provide: IAircraftTypeDesignatorRepoService, useClass: RestAircraftTypeDesignatorRepoService},
    ],
})
export class AircraftRestModule {
}
