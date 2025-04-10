import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DatetimeHelper} from '../../../../system/domain/service/datetime/datetime-helper';
import {TokenService} from '../../../domain/service/token.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


export const identicalPasswordsValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const pw1 = form.get('password');
    const pw2 = form.get('password2');

    return pw1.value !== pw2.value ? {'passwordMismatch': true} : null;
};


@Component({
    selector: 'app-forgot-pw-step2-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule
    ],
    templateUrl: './forgot-pw-step2-form.component.html',
    styleUrls: ['./forgot-pw-step2-form.component.scss']
})
export class ForgotPwStep2FormComponent implements OnInit, OnChanges {
    @Input() tokenString: string;
    @Output() onResetPwClick = new EventEmitter<[string, boolean]>();
    public resetPwForm: FormGroup;
    public email: string;
    public isInvalidToken: boolean;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        const userToken = TokenService.parseUserToken(this.tokenString);
        if (userToken && !DatetimeHelper.isTimestampSecondsExpired(userToken.expireTimestamp)) {
            this.email = userToken.email;
            this.isInvalidToken = false;
        } else {
            this.isInvalidToken = true;
        }

        this.initForm();
    }


    private initForm() {
        this.resetPwForm = this.formBuilder.group({
            'email': [this.email],
            'password': ['', [Validators.required, Validators.minLength(6)]],
            'password2': ['', [Validators.required, Validators.minLength(6)]],
            'rememberMe': [false]
        }, {validator: identicalPasswordsValidator});
    }
}
