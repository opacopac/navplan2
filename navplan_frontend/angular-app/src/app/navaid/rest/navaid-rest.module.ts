import {NgModule} from '@angular/core';
import {RestNavaidService} from './service/rest-navaid.service';
import {INavaidRepo} from '../domain/service/i-navaid-repo';
import {NavaidDomainModule} from '../domain/navaid-domain.module';


@NgModule({
    imports: [
        NavaidDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: INavaidRepo, useClass: RestNavaidService},
    ]
})
export class NavaidRestModule {
}
