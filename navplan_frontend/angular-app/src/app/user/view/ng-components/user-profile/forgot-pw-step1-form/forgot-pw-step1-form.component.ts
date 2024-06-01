import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-forgot-pw-step1-form',
    templateUrl: './forgot-pw-step1-form.component.html',
    styleUrls: ['./forgot-pw-step1-form.component.scss']
})
export class ForgotPwStep1FormComponent implements OnInit {
    @Input() lostPwEmailSentTo: string;
    @Output() onSendLostPwEmailEmailClick: EventEmitter<string> = new EventEmitter<string>();
    public lostPwStep1Form: FormGroup;


    constructor(private formBuilder: FormBuilder) {
    }


    ngOnInit() {
        this.initForm();
    }


    private initForm() {
        this.lostPwStep1Form = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email]]
        });
    }
}
