import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {userReducer} from './ngrx/user.reducer';
import {AutoLoginEffects} from './ngrx/auto-login.effects';
import {LoginEffects} from './ngrx/login.effects';
import {LogoutEffects} from './ngrx/logout.effects';
import {RegisterEffects} from './ngrx/register.effects';
import {LostPwEffects} from './ngrx/lost-pw.effects';
import {ChangePwEffects} from './ngrx/change-pw.effects';
import {UserDomainModule} from '../domain/user-domain.module';
import {UserRestModule} from '../rest/user-rest.module';


@NgModule({
    imports: [
        StoreModule.forFeature('userState', userReducer),
        EffectsModule.forFeature([
            AutoLoginEffects,
            LoginEffects,
            LogoutEffects,
            RegisterEffects,
            LostPwEffects,
            ChangePwEffects
        ]),
        UserDomainModule,
        UserRestModule,
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class UserStateModule {
}
