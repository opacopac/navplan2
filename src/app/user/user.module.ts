import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './services/user/user.service';
import {UserprofileComponent} from './components/userprofile/userprofile.component';
import {ForgotpwComponent} from './components/forgotpw/forgotpw.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './user.effects';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('userState', userReducer),
        EffectsModule.forFeature([UserEffects])
    ],
    declarations: [
        LoginComponent,
        UserprofileComponent,
        ForgotpwComponent,
    ],
    providers: [
        UserService,
    ]
})
export class UserModule {}
