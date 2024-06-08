import {NgModule} from '@angular/core';
import {RestNavaidService} from './service/rest-navaid.service';
import {INavaidRepo} from '../domain/service/i-navaid-repo';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: INavaidRepo, useClass: RestNavaidService},
    ]
})
export class NavaidRestModule {
}
