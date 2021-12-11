import {NgModule} from '@angular/core';
import {RestUserRepoService} from './rest-service/rest-user.service';
import {IUserRepoService} from '../user/domain-service/i-user-repo.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IUserRepoService, useClass: RestUserRepoService },
    ]
})
export class UserRestModule {}
