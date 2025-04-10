import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-flightroute-name',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './flightroute-name.component.html',
    styleUrls: ['./flightroute-name.component.scss']
})
export class FlightrouteNameComponent implements OnInit {
    @Input() public flightrouteName: string;
    @Output() public flightrouteNameChange = new EventEmitter<string>();

    public flightrouteNameFormGroup: FormGroup;

    protected readonly ButtonColor = ButtonColor;


    constructor(public parentForm: FormGroupDirective) {
    }

    ngOnInit() {
        this.flightrouteNameFormGroup = this.parentForm.form;
        this.flightrouteNameFormGroup.addControl(
            'flightrouteNameInput', new FormControl(this.flightrouteName, [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(50)
            ])
        );
    }


    protected onFlightrouteNameChange(name: string) {
        if (this.isValidFlightrouteName(name)) {
            this.flightrouteNameChange.emit(name);
        }
    }


    protected isValidFlightrouteName(value: string) {
        return value && value.length > 0 && value.length <= 50;
    }
}
