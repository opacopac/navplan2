import {NgModule} from '@angular/core';
import {IAircraftRepoService} from '../domain/service/i-aircraft-repo.service';
import {RestAircraftRepoService} from './service/rest-aircraft-repo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAircraftRepoService, useClass: RestAircraftRepoService}
    ],
})
export class AircraftRestModule {
}
