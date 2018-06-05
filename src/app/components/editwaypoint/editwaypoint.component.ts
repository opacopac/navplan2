import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { Sessioncontext } from '../../model/sessioncontext';
import { SessionService } from '../../services/utils/session.service';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';
import { Waypoint2 } from "../../model/flightroute-model/waypoint2";
import 'rxjs/add/operator/withLatestFrom';
import $ from 'jquery';
declare var $: $; // wtf? --> https://github.com/dougludlow/ng2-bs3-modal/issues/147


@Component({
    selector: 'app-editwaypoint',
    templateUrl: './editwaypoint.component.html',
    styleUrls: ['./editwaypoint.component.css']
})
export class EditwaypointComponent implements OnInit, OnDestroy {
    @ViewChild('container') container: HTMLElement;
    public session: Sessioncontext;
    public editWpForm: FormGroup;
    public waypoint: Waypoint2;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;
    private editWaypointActiveSubscription: Subscription;


    constructor(
        public sessionService: SessionService) {

        this.session = sessionService.getSessionContext();
        this.editWaypointActiveSubscription = this.session
            .editWaypointActive$
            .withLatestFrom(this.session.selectedWaypoint$)
            .subscribe(([editActive, selectedWaypoint]) => {
                this.waypoint = selectedWaypoint;
                if (editActive && selectedWaypoint) {
                    this.showForm();
                } else {
                    this.hideForm();
                }
            });
    }


    ngOnInit() {
        this.initForm();
    }


    ngOnDestroy() {
        this.editWaypointActiveSubscription.unsubscribe();
    }


    public onSaveClicked(waypoint) {
        if (this.editWpForm.valid) {
            this.updateWpByFormValues();
            this.session.setSelectedWaypoint(undefined);
        }
    }


    public onCancelClicked() {
        this.session.setSelectedWaypoint(undefined);
    }


    public onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    private initForm() {
        this.editWpForm = new FormGroup({
            'checkpoint': new FormControl(undefined, [Validators.required, Validators.maxLength(30)]),
            'freq': new FormControl(undefined, Validators.maxLength(7)),
            'callsign': new FormControl(undefined, Validators.maxLength(10)),
            'alt': new FormControl(undefined, [Validators.maxLength(5), Validators.min(0), Validators.max(99999)]),
            'isminalt': new FormControl(),
            'ismaxalt': new FormControl(),
            'isaltatlegstart': new FormControl(),
            'remark': new FormControl(undefined, Validators.maxLength(50)),
            'supp_info': new FormControl(undefined, Validators.maxLength(255))
        });
    }


    private showForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('show')
        }, 10);
    }


    private hideForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('hide')
        }, 10);
    }


    private updateWpByFormValues() {
        const formValues = this.editWpForm.value;
        this.waypoint.checkpoint = formValues.checkpoint;
        this.waypoint.freq = formValues.freq;
        this.waypoint.callsign = formValues.callsign;
        this.waypoint.alt.alt = isNaN(formValues.alt) ? undefined : formValues.alt;
        this.waypoint.alt.isminalt = formValues.isminalt;
        this.waypoint.alt.ismaxalt = formValues.ismaxalt;
        this.waypoint.alt.isaltatlegstart = formValues.isaltatlegstart;
        this.waypoint.remark = formValues.remark;
        this.waypoint.supp_info = formValues.supp_info;
    }
}
