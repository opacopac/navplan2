import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-register-step1-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule
    ],
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
