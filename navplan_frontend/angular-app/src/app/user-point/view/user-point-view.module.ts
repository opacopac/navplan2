import {NgModule} from '@angular/core';
import {UserPointDomainModule} from '../domain/user-point-domain.module';
import {UserPointRestModule} from '../rest/user-point-rest.module';


@NgModule({
    imports: [
        UserPointDomainModule,
        UserPointRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class UserPointViewModule {
}
