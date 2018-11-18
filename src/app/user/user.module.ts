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
import {RegisterStep1FormComponent} from './components/register-step1-form/register-step1-form.component';
import { RegisterStep2FormComponent } from './components/register-step2-form/register-step2-form.component';
import { RegisterStep2PageComponent } from './components/register-step2-page/register-step2-page.component';


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
        UserprofileComponent,
        ForgotpwComponent,
        RegisterStep1FormComponent,
        RegisterStep2FormComponent,
        RegisterStep2PageComponent,
    ],
    providers: [
        UserService,
    ]
})
export class UserModule {}
