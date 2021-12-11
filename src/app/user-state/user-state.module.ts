import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {userReducer} from './ngrx/user.reducer';
import {UserActions} from './ngrx/user.actions';
import {UserState} from './state-model/user-state';
import {AutoLoginEffects} from './ngrx/auto-login.effects';
import {LoginEffects} from './ngrx/login.effects';
import {LogoutEffects} from './ngrx/logout.effects';
import {RegisterEffects} from './ngrx/register.effects';
import {LostPwEffects} from './ngrx/lost-pw.effects';
import {ChangePwEffects} from './ngrx/change-pw.effects';


@NgModule({
    imports: [
        StoreModule.forFeature<UserState, UserActions>('userState', userReducer),
        EffectsModule.forFeature([
            AutoLoginEffects,
            LoginEffects,
            LogoutEffects,
            RegisterEffects,
            LostPwEffects,
            ChangePwEffects
        ]),
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]
})
export class UserStateModule {}
