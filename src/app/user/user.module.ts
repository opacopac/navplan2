import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserService} from './services/user/user.service';
import {UserprofileComponent} from './components/userprofile/userprofile.component';
import {ForgotpwComponent} from './components/forgotpw/forgotpw.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SharedModule} from '../shared/shared.module';
import {userReducer} from './user.reducer';
import {UserEffects} from './user.effects';
import {UserState} from './user-state';
import {UserActions} from './user.actions';
import {LoginRegisterPageComponent} from './components/login-register-page/login-register-page.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<UserState, UserActions>('userState', userReducer),
        EffectsModule.forFeature([UserEffects]),
        SharedModule,
    ],
    declarations: [
        LoginRegisterPageComponent,
        LoginFormComponent,
        RegisterFormComponent,
        UserprofileComponent,
        ForgotpwComponent,
        RegisterFormComponent,
    ],
    providers: [
        UserService,
    ]
})
export class UserModule {}
