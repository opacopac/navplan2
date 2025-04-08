import {NgModule} from '@angular/core';
import {RestAirspaceService} from './service/rest-airspace.service';
import {IAirspaceRepo} from '../domain/service/i-airspace-repo';
import {AirspaceDomainModule} from '../domain/airspace-domain.module';


@NgModule({
    imports: [
        AirspaceDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IAirspaceRepo, useClass: RestAirspaceService},
    ]
})
export class AirspaceRestModule {
}
