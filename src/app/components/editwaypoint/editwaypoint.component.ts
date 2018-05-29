import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sessioncontext } from '../../model/sessioncontext';
import { SessionService } from '../../services/utils/session.service';
import { FlightrouteService } from "../../services/flightroute/flightroute.service";
import { Waypoint } from '../../model/waypoint';
import { ButtonColor, ButtonSize } from '../buttons/button-base.directive';
import $ from 'jquery';
declare var $: $; // wtf? --> https://github.com/dougludlow/ng2-bs3-modal/issues/147


@Component({
    selector: 'app-editwaypoint',
    templateUrl: './editwaypoint.component.html',
    styleUrls: ['./editwaypoint.component.css']
})
export class EditwaypointComponent implements OnInit {
    @ViewChild('container') container: HTMLElement;
    public session: Sessioncontext;
    public editWpForm: FormGroup;
    public waypoint: Waypoint;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(
        public sessionService: SessionService,
        private flightrouteService: FlightrouteService) {

        this.session = sessionService.getSessionContext();
        this.flightrouteService.editWaypointClicked$.subscribe(wp => this.editWaypoint(wp));
    }


    ngOnInit() {
    }


    public onSaveClicked() {
        if (this.editWpForm.valid) {
            this.updateWpByFormValues();
            this.waypoint = undefined;
            //this.onWaypointChanged.emit(true);
        }
    }


    public onCancelClicke() {
        this.waypoint = undefined;
    }


    public onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    private editWaypoint(waypoint: Waypoint) {
        this.waypoint = waypoint;
        this.initForm();
        this.showForm();
    }


    private initForm() {
        this.editWpForm = new FormGroup({
            'checkpoint': new FormControl(this.waypoint.checkpoint, [Validators.required, Validators.maxLength(30)]),
            'freq': new FormControl(this.waypoint.freq, Validators.maxLength(7)),
            'callsign': new FormControl(this.waypoint.callsign, Validators.maxLength(10)),
            'alt': new FormControl(this.waypoint.alt.alt, [Validators.maxLength(5), Validators.min(0), Validators.max(99999)]),
            'isminalt': new FormControl(this.waypoint.alt.isminalt),
            'ismaxalt': new FormControl(this.waypoint.alt.ismaxalt),
            'isaltatlegstart': new FormControl(this.waypoint.alt.isaltatlegstart),
            'remark': new FormControl(this.waypoint.remark, Validators.maxLength(50)),
            'supp_info': new FormControl(this.waypoint.supp_info, Validators.maxLength(255))
        });
    }


    private showForm() {
        window.setTimeout(() => {
            $('#selectedWaypointDialog').modal('show')
        }, 10);
        //$jq('#selectedWaypointDialog').modal('show');
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
