import {NgModule} from '@angular/core';
import {IRouteMeteoService} from './domain-service/i-route-meteo.service';
import {RouteMeteoService} from './domain-service/route-meteo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IRouteMeteoService, useClass: RouteMeteoService }
    ],
})
export class RouteMeteoModule {}
