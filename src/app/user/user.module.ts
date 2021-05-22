import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserService} from './domain-service/user.service';
import {RestUserService} from './rest-service/rest-user.service';
import {UserProfilePageComponent} from './ng-components/user-profile-page/user-profile-page.component';
import {LoginFormComponent} from './ng-components/login-form/login-form.component';
import {SharedModule} from '../common/shared.module';
import {userReducer} from './ngrx/user.reducer';
import {UserState} from './ngrx/user-state';
import {UserActions} from './ngrx/user.actions';
import {LoginRegisterPageComponent} from './ng-components/login-register-page/login-register-page.component';
import {RegisterStep1FormComponent} from './ng-components/register-step1-form/register-step1-form.component';
import {RegisterStep2FormComponent} from './ng-components/register-step2-form/register-step2-form.component';
import {RegisterStep2PageComponent} from './ng-components/register-step2-page/register-step2-page.component';
import {UserProfileFormComponent} from './ng-components/user-profile-form/user-profile-form.component';
import {ForgotPwStep1PageComponent} from './ng-components/forgot-pw-step1-page/forgot-pw-step1-page.component';
import {ForgotPwStep2PageComponent} from './ng-components/forgot-pw-step2-page/forgot-pw-step2-page.component';
import {ForgotPwStep1FormComponent} from './ng-components/forgot-pw-step1-form/forgot-pw-step1-form.component';
import {ForgotPwStep2FormComponent} from './ng-components/forgot-pw-step2-form/forgot-pw-step2-form.component';
import {LoginEffects} from './ngrx/login.effects';
import {RegisterEffects} from './ngrx/register.effects';
import {LostPwEffects} from './ngrx/lost-pw.effects';
import {ChangePwEffects} from './ngrx/change-pw.effects';
import {AutoLoginEffects} from './ngrx/auto-login.effects';
import {LogoutEffects} from './ngrx/logout.effects';
import {OlOverlayUserpointInfoTabComponent} from './ng-components/ol-overlay-userpoint-info-tab/ol-overlay-userpoint-info-tab.component';
import {OlOverlayUserpointHeaderComponent} from './ng-components/ol-overlay-userpoint-header/ol-overlay-userpoint-header.component';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature<UserState, UserActions>('userState', userReducer),
        EffectsModule.forFeature([
            AutoLoginEffects,
            LoginEffects,
            LogoutEffects,
            RegisterEffects,
            LostPwEffects,
            ChangePwEffects
        ]),
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
        OlOverlayUserpointHeaderComponent,
        OlOverlayUserpointInfoTabComponent
    ],
    exports: [
        OlOverlayUserpointHeaderComponent,
        OlOverlayUserpointInfoTabComponent
    ],
    providers: [
        { provide: UserService, useClass: RestUserService },
    ]
})
export class UserModule {}
