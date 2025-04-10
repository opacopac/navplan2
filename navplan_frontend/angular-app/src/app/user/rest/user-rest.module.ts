import {NgModule} from '@angular/core';
import {RestUserRepoService} from './service/rest-user.service';
import {IUserRepoService} from '../domain/service/i-user-repo.service';
import {UserDomainModule} from '../domain/user-domain.module';


@NgModule({
    imports: [
        UserDomainModule
    ],
    declarations: [],
    exports: [],
    providers: [
        {provide: IUserRepoService, useClass: RestUserRepoService},
    ]
})
export class UserRestModule {
}
