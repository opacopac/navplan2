import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserService} from './rest/user.service';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SharedModule} from '../shared/shared.module';
import {userReducer} from './ngrx/user.reducer';
import {UserEffects} from './ngrx/user.effects';
import {UserState} from './domain/user-state';
import {UserActions} from './ngrx/user.actions';
import {LoginRegisterPageComponent} from './components/login-register-page/login-register-page.component';
import {RegisterStep1FormComponent} from './components/register-step1-form/register-step1-form.component';
import {RegisterStep2FormComponent} from './components/register-step2-form/register-step2-form.component';
import {RegisterStep2PageComponent} from './components/register-step2-page/register-step2-page.component';
import {UserProfileFormComponent} from './components/user-profile-form/user-profile-form.component';
import {ForgotPwStep1PageComponent} from './components/forgot-pw-step1-page/forgot-pw-step1-page.component';
import {ForgotPwStep2PageComponent} from './components/forgot-pw-step2-page/forgot-pw-step2-page.component';
import {ForgotPwStep1FormComponent} from './components/forgot-pw-step1-form/forgot-pw-step1-form.component';
import {ForgotPwStep2FormComponent} from './components/forgot-pw-step2-form/forgot-pw-step2-form.component';


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
        RegisterStep1FormComponent,
        UserProfilePageComponent,
        RegisterStep1FormComponent,
        RegisterStep2FormComponent,
        RegisterStep2PageComponent,
        UserProfileFormComponent,
        ForgotPwStep1PageComponent,
        ForgotPwStep2PageComponent,
        ForgotPwStep1FormComponent,
        ForgotPwStep2FormComponent,
    ],
    providers: [
        UserService,
    ]
})
export class UserModule {}
