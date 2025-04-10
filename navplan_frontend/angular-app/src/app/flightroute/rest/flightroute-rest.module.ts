import {NgModule} from '@angular/core';
import {IFlightrouteRepoService} from '../domain/service/i-flightroute-repo.service';
import {RestFlightrouteRepoService} from './service/rest-flightroute-repo.service';
import {FlightrouteDomainModule} from '../domain/flightroute-domain.module';


@NgModule({
    imports: [
        FlightrouteDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IFlightrouteRepoService, useClass: RestFlightrouteRepoService}
    ],
})
export class FlightrouteRestModule {
}
