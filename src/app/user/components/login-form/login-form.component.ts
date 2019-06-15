import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../domain/user';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    @Input() currentUser: User; // TODO: needed?
    @Output() onLoginClick: EventEmitter<[string, string, boolean]> = new EventEmitter<[string, string, boolean]>();
    public loginForm: FormGroup;
    public console = console;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    private initForm() {
        this.loginForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', [Validators.required]],
            'rememberMe': [false]
        });
    }
}
