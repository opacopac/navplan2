import {NgModule} from '@angular/core';
import {IFlightrouteRepoService} from '../domain/service/i-flightroute-repo.service';
import {RestFlightrouteRepoService} from './service/rest-flightroute-repo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IFlightrouteRepoService, useClass: RestFlightrouteRepoService }
    ],
})
export class FlightrouteRestModule {}
