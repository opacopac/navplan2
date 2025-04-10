import {NgModule} from '@angular/core';
import {UserDomainModule} from '../domain/user-domain.module';
import {UserStateModule} from '../state/user-state.module';


@NgModule({
    imports: [
        UserDomainModule,
        UserStateModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class UserViewModule {
}
