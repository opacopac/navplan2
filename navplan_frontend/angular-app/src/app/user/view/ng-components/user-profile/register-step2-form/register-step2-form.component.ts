import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DatetimeHelper} from '../../../../../system/domain/service/datetime/datetime-helper';
import {TokenService} from '../../../../domain/service/token.service';


export const identicalPasswordsValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const pw1 = form.get('password');
    const pw2 = form.get('password2');

    return pw1.value !== pw2.value ? {'passwordMismatch': true} : null;
};


@Component({
    selector: 'app-register-step2-form',
    templateUrl: './register-step2-form.component.html',
    styleUrls: ['./register-step2-form.component.scss']
})
export class RegisterStep2FormComponent implements OnInit, OnChanges {
    @Input() tokenString: string;
    @Output() onCreateAccount: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();
    public registerForm: FormGroup;
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
        this.registerForm = this.formBuilder.group({
            'email': [this.email],
            'password': ['', [Validators.required, Validators.minLength(6)]],
            'password2': ['', [Validators.required, Validators.minLength(6)]],
            'rememberMe': [false]
        }, { validator: identicalPasswordsValidator });
    }
}
