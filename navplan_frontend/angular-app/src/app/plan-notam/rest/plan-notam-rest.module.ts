import {NgModule} from '@angular/core';
import {IRouteNotamRepoService} from '../domain/service/i-route-notam-repo.service';
import {RestRouteNotamRepo} from './service/rest-route-notam-repo.service';
import {PlanNotamDomainModule} from '../domain/plan-notam-domain.module';


@NgModule({
    imports: [
        PlanNotamDomainModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IRouteNotamRepoService, useClass: RestRouteNotamRepo},
    ]
})
export class PlanNotamRestModule {
}
