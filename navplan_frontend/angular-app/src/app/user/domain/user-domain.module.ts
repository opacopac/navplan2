import {NgModule} from '@angular/core';
import {IUserService} from './service/i-user.service';
import {UserService} from './service/user.service';


@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        {provide: IUserService, useClass: UserService}
    ]
})
export class UserDomainModule {
}
