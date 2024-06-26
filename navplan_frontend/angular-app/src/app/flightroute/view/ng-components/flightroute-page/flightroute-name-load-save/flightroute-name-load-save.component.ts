import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';


@Component({
    selector: 'app-flightroute-name-load-save',
    templateUrl: './flightroute-name-load-save.component.html',
    styleUrls: ['./flightroute-name-load-save.component.scss']
})
export class FlightrouteNameLoadSaveComponent implements OnInit {
    @Input() public flightrouteName: string;
    @Input() public flightrouteId: number;
    @Input() public isUserLoggedIn: boolean;
    @Output() public flightrouteNameChange = new EventEmitter<string>();
    @Output() public loadFlightrouteClick = new EventEmitter<null>();
    @Output() public saveFlightrouteClick = new EventEmitter<null>();
    @Output() public saveFlightrouteCopyClick = new EventEmitter<null>();

    public flightrouteNameFormGroup: FormGroup;

    constructor(public parentForm: FormGroupDirective) {
    }

    ngOnInit() {
        this.flightrouteNameFormGroup = this.parentForm.form;
        this.flightrouteNameFormGroup.addControl(
            'flightrouteNameInput', new FormControl(this.flightrouteName, [Validators.required,
                Validators.minLength(1), Validators.maxLength(50)])
        );
    }


    protected isLoadButtonEnabled(): boolean {
        return this.isUserLoggedIn;
    }


    protected isSaveButtonEnabled(): boolean {
        return this.isUserLoggedIn && this.flightrouteName.length > 0 && !this.parentForm.invalid;
    }


    protected isSaveCopyButtonEnabled(): boolean {
        return this.isSaveButtonEnabled() && this.flightrouteId > 0;
    }


    protected onFlightrouteNameChange(name: string) {
        if (this.isValidFlightrouteName(name)) {
            this.flightrouteNameChange.emit(name);
        }
    }


    protected onLoadFlightrouteClick() {
        this.loadFlightrouteClick.emit();
    }


    protected onSaveFlightrouteClick() {
        this.saveFlightrouteClick.emit();
    }


    protected onSaveFlightrouteCopyClick() {
        this.saveFlightrouteCopyClick.emit();
    }


    protected isValidFlightrouteName(value: string) {
        return value && value.length > 0 && value.length <= 50;
    }
}
