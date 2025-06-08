import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-flightroute-comments',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './flightroute-comments.component.html',
    styleUrls: ['./flightroute-comments.component.scss']
})
export class FlightrouteCommentsComponent implements OnInit {
    @Input() public routeComments: string;
    @Output() public routeCommentsChanged = new EventEmitter<string>();


    public flightrouteCommentsFormGroup: FormGroup;

    constructor(public parentForm: FormGroupDirective) {
    }

    ngOnInit() {
        this.flightrouteCommentsFormGroup = this.parentForm.form;
        this.flightrouteCommentsFormGroup.addControl(
            'flightrouteCommentsInput', new FormControl(this.routeComments, [Validators.maxLength(1024)])
        );
    }


    protected onRouteCommentsChanged(routeComments: string) {
        this.routeCommentsChanged.emit(routeComments);
    }
}
