import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    LoginRegisterPageComponent
} from './ng-components/user-profile/login-register-page/login-register-page.component';
import {LoginFormComponent} from './ng-components/user-profile/login-form/login-form.component';
import {
    RegisterStep1FormComponent
} from './ng-components/user-profile/register-step1-form/register-step1-form.component';
import {UserProfilePageComponent} from './ng-components/user-profile/user-profile-page/user-profile-page.component';
import {
    RegisterStep2FormComponent
} from './ng-components/user-profile/register-step2-form/register-step2-form.component';
import {
    RegisterStep2PageComponent
} from './ng-components/user-profile/register-step2-page/register-step2-page.component';
import {UserProfileFormComponent} from './ng-components/user-profile/user-profile-form/user-profile-form.component';
import {
    ForgotPwStep1PageComponent
} from './ng-components/user-profile/forgot-pw-step1-page/forgot-pw-step1-page.component';
import {
    ForgotPwStep2PageComponent
} from './ng-components/user-profile/forgot-pw-step2-page/forgot-pw-step2-page.component';
import {
    ForgotPwStep1FormComponent
} from './ng-components/user-profile/forgot-pw-step1-form/forgot-pw-step1-form.component';
import {
    ForgotPwStep2FormComponent
} from './ng-components/user-profile/forgot-pw-step2-form/forgot-pw-step2-form.component';
import {
    OlOverlayUserpointHeaderComponent
} from './ng-components/user-point/ol-overlay-userpoint-header/ol-overlay-userpoint-header.component';
import {
    OlOverlayUserpointInfoTabComponent
} from './ng-components/user-point/ol-overlay-userpoint-info-tab/ol-overlay-userpoint-info-tab.component';
import {UserDomainModule} from '../domain/user-domain.module';
import {UserRestModule} from '../rest/user-rest.module';
import {UserStateModule} from '../state/user-state.module';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterModule} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {GeoPhysicsDomainModule} from '../../geo-physics/domain/geo-physics-domain.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatExpansionModule,
        UserDomainModule,
        UserRestModule,
        UserStateModule,
        GeoPhysicsDomainModule,
    ],
    declarations: [
        LoginRegisterPageComponent,
        LoginFormComponent,
        RegisterStep1FormComponent,
        UserProfilePageComponent,
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
    ]
})
export class UserViewModule {}
