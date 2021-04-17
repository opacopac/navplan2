import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Waypoint} from '../../domain-model/waypoint';
import {ButtonColor, ButtonSize} from '../../../shared/directives/button-base/button-base.directive';


@Component({
    selector: 'app-edit-waypoint-form',
    templateUrl: './edit-waypoint-form.component.html',
    styleUrls: ['./edit-waypoint-form.component.css']
})
export class EditWaypointFormComponent implements OnInit, OnChanges {
    @Input() editWaypoint: Waypoint;
    @Output() onSaveClick: EventEmitter<[Waypoint, Waypoint]> = new EventEmitter<[Waypoint, Waypoint]>();
    @Output() onCancelClick: EventEmitter<null> = new EventEmitter<null>();
    public editWpForm: FormGroup;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(public formBuilder: FormBuilder) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initForm(this.editWaypoint);
    }


    public onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    public onSaveClicked() {
        const newWp = this.editWaypoint.clone();
        newWp.freq = this.editWpForm.get('freq').value;
        newWp.callsign = this.editWpForm.get('callsign').value;
        newWp.checkpoint = this.editWpForm.get('checkpoint').value;
        newWp.remark = this.editWpForm.get('remark').value;
        newWp.supp_info = this.editWpForm.get('supp_info').value;
        newWp.alt.alt_ft = this.editWpForm.get('alt').value;
        newWp.alt.isminalt = this.editWpForm.get('isminmaxalt').value.includes('min');
        newWp.alt.ismaxalt = this.editWpForm.get('isminmaxalt').value.includes('max');
        newWp.alt.isaltatlegstart = this.editWpForm.get('isaltatlegstart').value === 'true';

        this.onSaveClick.emit([this.editWaypoint, newWp]);
    }


    public onCancelClicked() {
        this.onCancelClick.emit();
    }


    private initForm(editWaypoint: Waypoint) {
        this.editWpForm = this.formBuilder.group({
            'checkpoint': [
                editWaypoint ? editWaypoint.checkpoint : '',
                [Validators.required, Validators.maxLength(30)]],
            'freq': [
                editWaypoint ? editWaypoint.freq : '',
                Validators.maxLength(7)],
            'callsign': [
                editWaypoint ? editWaypoint.callsign : '',
                Validators.maxLength(10)],
            'alt': [
                (editWaypoint && editWaypoint.alt.alt_ft) ? editWaypoint.alt.alt_ft : '',
                [Validators.maxLength(5), Validators.min(0), Validators.max(99999)]],
            'isminmaxalt': [
                editWaypoint ? [editWaypoint.alt.isminalt ? 'min' : '', editWaypoint.alt.ismaxalt ? 'max' : ''] : []],
            'isaltatlegstart': [
                (editWaypoint && editWaypoint.alt.isaltatlegstart) ? 'true' : 'false'],
            'remark': [
                editWaypoint ? editWaypoint.remark : '',
                Validators.maxLength(50)],
            'supp_info': [
                editWaypoint ? editWaypoint.supp_info : '',
                Validators.maxLength(255)]
        });
    }
}
