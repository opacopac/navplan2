import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Waypoint} from '../../model/waypoint';
import {ButtonColor, ButtonSize} from '../../../components/buttons/button-base.directive';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WaypointAltitude} from '../../model/waypoint-altitude';


@Component({
    selector: 'app-edit-waypoint-form',
    templateUrl: './edit-waypoint-form.component.html',
    styleUrls: ['./edit-waypoint-form.component.css']
})
export class EditWaypointFormComponent implements OnInit {
    @Output() onSaveClicked = new EventEmitter<Waypoint>();
    @Output() onCancelClicked = new EventEmitter<null>();
    private _editWaypoint: Waypoint;
    public editWpForm: FormGroup;
    public ButtonSize = ButtonSize;
    public ButtonColor = ButtonColor;


    constructor(public formBuilder: FormBuilder) {
        this.initForm();
    }


    @Input()
    public set editWaypoint(value: Waypoint) {
        this._editWaypoint = value;

        if (value) {
            this.setFormValues(
                value.checkpoint,
                value.freq,
                value.callsign,
                value.alt.alt_ft,
                value.alt.isminalt,
                value.alt.ismaxalt,
                value.alt.isaltatlegstart,
                value.remark,
                value.supp_info
            );
        } else {
            this.setFormValues(
                '',
                '',
                '',
                undefined,
                false,
                false,
                false,
                '',
                ''
            );
        }
    }



    ngOnInit() {
    }


    public onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    public onSetIsAltAtLegStartClicked(value: boolean) {
        this.editWpForm.patchValue({'isaltatlegstart': value});
        this.editWpForm.patchValue({'isaltatlegend': !value});
    }


    public onSaveButtonClicked() {
        const alt = new WaypointAltitude(
            this.editWpForm.get('alt').value,
            this.editWpForm.get('isminalt').value,
            this.editWpForm.get('ismaxalt').value,
            this.editWpForm.get('isaltatlegstart').value
        );

        const wp = new Waypoint(
            this._editWaypoint.type,
            this.editWpForm.get('freq').value,
            this.editWpForm.get('callsign').value,
            this.editWpForm.get('checkpoint').value,
            this.editWpForm.get('remark').value,
            this.editWpForm.get('supp_info').value,
            this._editWaypoint.position,
            alt
        );
        this.onSaveClicked.emit(wp);
    }


    private initForm() {
        this.editWpForm = this.formBuilder.group({
            'checkpoint': ['', [Validators.required, Validators.maxLength(30)]],
            'freq': ['', Validators.maxLength(7)],
            'callsign': ['', Validators.maxLength(10)],
            'alt': ['', [Validators.maxLength(5), Validators.min(0), Validators.max(99999)]],
            'isminalt': false,
            'ismaxalt': false,
            'isaltatlegstart': false,
            'isaltatlegend': true,
            'remark': ['', Validators.maxLength(50)],
            'supp_info': ['', Validators.maxLength(255)]
        });
    }


    private setFormValues(checkpoint: string, freq: string, callsign: string, alt_ft: number, ismaxalt: boolean, isminalt: boolean, isaltatlegstart: boolean, remark: string, supp_info: string) {
        this.editWpForm.setValue({
            'checkpoint': checkpoint,
            'freq': freq,
            'callsign': callsign,
            'alt': alt_ft ? alt_ft : '',
            'isminalt': isminalt,
            'ismaxalt': ismaxalt,
            'isaltatlegstart': isaltatlegstart,
            'isaltatlegend': !isaltatlegstart,
            'remark': remark,
            'supp_info': supp_info
        });
    }
}
