import {NgModule} from '@angular/core';
import {RestAirspaceService} from './service/rest-airspace.service';
import {IAirspaceRepo} from '../domain/service/i-airspace-repo';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirspaceRepo, useClass: RestAirspaceService},
    ]
})
export class AirspaceRestModule {
}
