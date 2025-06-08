import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../../domain/model/user';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


export const identicalPasswordsValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const pw1 = form.get('newPassword');
    const pw2 = form.get('newPassword2');

    return pw1.value !== pw2.value ? {'passwordMismatch': true} : null;
};


@Component({
    selector: 'app-user-profile-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit, OnChanges {
    @Input() public currentUser: User;
    @Output() public onChangePwClick = new EventEmitter<[string, string]>();
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
        }, {validator: identicalPasswordsValidator});
    }
}
