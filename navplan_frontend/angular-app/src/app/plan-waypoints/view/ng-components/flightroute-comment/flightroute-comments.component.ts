import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';


@Component({
    selector: 'app-flightroute-comments',
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
