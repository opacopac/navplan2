import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../domain-model/user';


export const identicalPasswordsValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const pw1 = form.get('newPassword');
    const pw2 = form.get('newPassword2');

    return pw1.value !== pw2.value ? {'passwordMismatch': true} : null;
};


@Component({
    selector: 'app-user-profile-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.css']
})
export class UserProfileFormComponent implements OnInit, OnChanges {
    @Input() public currentUser: User;
    @Output() public onChangePwClick: EventEmitter<[User, string, string]> = new EventEmitter<[User, string, string]>();
    public changePwForm: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initForm();
    }


    private initForm() {
        this.changePwForm = this.formBuilder.group({
            'email': [this.currentUser.email],
            'oldPassword': ['', [Validators.required, Validators.minLength(6)]],
            'newPassword': ['', [Validators.required, Validators.minLength(6)]],
            'newPassword2': ['', [Validators.required, Validators.minLength(6)]]
        }, { validator: identicalPasswordsValidator });
    }
}
