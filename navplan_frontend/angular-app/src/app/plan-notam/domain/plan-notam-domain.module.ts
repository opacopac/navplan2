import {NgModule} from '@angular/core';
import {IRouteNotamService} from './service/i-route-notam.service';
import {RouteNotamService} from './service/route-notam.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IRouteNotamService, useClass: RouteNotamService}
    ]
})
export class PlanNotamDomainModule {
}
