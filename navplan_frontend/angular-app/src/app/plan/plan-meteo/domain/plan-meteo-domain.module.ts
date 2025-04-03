import {NgModule} from '@angular/core';
import {IRouteMeteoService} from './service/i-route-meteo.service';
import {RouteMeteoService} from './service/route-meteo.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IRouteMeteoService, useClass: RouteMeteoService},
    ],
})
export class PlanMeteoDomainModule {
}
