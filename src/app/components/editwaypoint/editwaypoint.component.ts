import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sessioncontext } from '../../model/sessioncontext';
import { SessionService } from '../../services/session.service';
import { MessageService } from '../../services/message.service';
import { Waypoint } from '../../model/waypoint';
import {current} from "codelyzer/util/syntaxKind";
import {isBoolean} from "util";


@Component({
    selector: 'app-editwaypoint',
    templateUrl: './editwaypoint.component.html',
    styleUrls: ['./editwaypoint.component.css']
})
export class EditwaypointComponent implements OnInit {
    @Output() onWaypointChanged = new EventEmitter<boolean>();

    public session: Sessioncontext;
    public editWpForm: FormGroup;
    public waypoint: Waypoint;
    public meep = true;


    constructor(
        public sessionService: SessionService,
        private messageService: MessageService) {

        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
        this.waypoint = new Waypoint(); // dummy
        this.initForm();
    }


    editWaypoint(waypoint: Waypoint) {
        this.waypoint = waypoint;
        this.initForm();
    }


    onToggleCheckboxButtonClicked(controlName: string) {
        const currentState = this.editWpForm.value[controlName] as boolean;
        this.editWpForm.patchValue({controlName: !currentState });
    }


    onToggleRadioButtonClicked(controlName: string, selectedValue: string) {
        this.editWpForm.patchValue({controlName: selectedValue });
    }


    onSaveClicked() {
        if (this.editWpForm.valid) {
            this.updateWpByFormValues();
            this.onWaypointChanged.emit(true);
        }
    }


    onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    private initForm() {
        this.editWpForm = new FormGroup({
            'checkpoint': new FormControl(this.waypoint.checkpoint, [Validators.required, Validators.maxLength(30)]),
            'freq': new FormControl(this.waypoint.freq, Validators.maxLength(7)),
            'callsign': new FormControl(this.waypoint.callsign, Validators.maxLength(10)),
            'alt': new FormControl(this.waypoint.alt.alt, [, Validators.maxLength(5), Validators.min(0), Validators.max(99999)]),
            'isminalt': new FormControl(this.waypoint.alt.isminalt),
            'ismaxalt': new FormControl(this.waypoint.alt.ismaxalt),
            'isaltatlegstart': new FormControl(this.waypoint.alt.isaltatlegstart ? '1' : '0'),
            'remark': new FormControl(this.waypoint.remark, Validators.maxLength(50)),
            'supp_info': new FormControl(this.waypoint.supp_info, Validators.maxLength(255))
        });
    }


    private updateWpByFormValues() {
        const formValues = this.editWpForm.value;
        this.waypoint.checkpoint = formValues.checkpoint;
        this.waypoint.freq = formValues.freq;
        this.waypoint.callsign = formValues.callsign;
        this.waypoint.alt.alt = isNaN(formValues.alt) ? undefined : formValues.alt;
        this.waypoint.alt.isminalt = formValues.isminalt;
        this.waypoint.alt.ismaxalt = formValues.ismaxalt;
        this.waypoint.alt.isaltatlegstart = formValues.isaltatlegstart === '1';
        this.waypoint.remark = formValues.remark;
        this.waypoint.supp_info = formValues.supp_info;
    }
}
