import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';


export const identicalPasswordsValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const pw1 = form.get('password');
    const pw2 = form.get('password2');

    return pw1.value !== pw2.value ? { 'passwordMismatch': true } : null;
};


@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
    @Output() onRegisterClick: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();
    public registerForm: FormGroup;



    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    private initForm() {
        this.registerForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', [Validators.required]],
            'password2': ['', [Validators.required]]
        }, { validator: identicalPasswordsValidator });
    }
}
