import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-register-step1-form',
    templateUrl: './register-step1-form.component.html',
    styleUrls: ['./register-step1-form.component.scss']
})
export class RegisterStep1FormComponent implements OnInit {
    @Input() registerEmailSentTo: string;
    @Output() onSendRegisterEmailClick: EventEmitter<string> = new EventEmitter<string>();
    public registerForm: FormGroup;



    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    private initForm() {
        this.registerForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email]]
        });
    }
}
