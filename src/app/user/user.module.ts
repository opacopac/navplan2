import {NgModule} from '@angular/core';
import {IUserService} from './domain-service/i-user.service';
import {UserService} from './domain-service/user.service';


@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: IUserService, useClass: UserService }
    ]
})
export class UserModule {}
