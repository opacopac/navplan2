import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Waypoint} from '../../../../domain/model/waypoint';
import {Altitude} from '../../../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeReference} from '../../../../../geo-physics/domain/model/geometry/altitude-reference';
import {ButtonColor} from '../../../../../common/view/model/button-color';
import {LengthUnit} from '../../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../../geo-physics/domain/model/quantities/length';


@Component({
    selector: 'app-edit-waypoint-form',
    templateUrl: './edit-waypoint-form.component.html',
    styleUrls: ['./edit-waypoint-form.component.scss']
})
export class EditWaypointFormComponent implements OnInit, OnChanges {
    @Input() editWaypoint: Waypoint;
    @Input() altitudeUnit: LengthUnit;
    @Output() onSaveClick: EventEmitter<[Waypoint, Waypoint]> = new EventEmitter<[Waypoint, Waypoint]>();
    @Output() onCancelClick: EventEmitter<null> = new EventEmitter<null>();

    protected editWpForm: FormGroup;
    protected readonly ButtonColor = ButtonColor;


    constructor(public formBuilder: FormBuilder) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initForm(this.editWaypoint);
    }


    protected getAltUnitText() {
        return Length.getUnitString(this.altitudeUnit);
    }


    protected onDeleteSuppInfoClicked() {
        this.editWpForm.patchValue({'supp_info': ''});
    }


    protected onSaveClicked() {
        const newWp = this.editWaypoint.clone();
        newWp.freq = this.editWpForm.get('freq').value;
        newWp.callsign = this.editWpForm.get('callsign').value;
        newWp.checkpoint = this.editWpForm.get('checkpoint').value;
        newWp.remark = this.editWpForm.get('remark').value;
        newWp.supp_info = this.editWpForm.get('supp_info').value;
        const altValue = parseInt(this.editWpForm.get('alt').value, 10);
        newWp.wpAlt.alt = isNaN(altValue) ? undefined : Altitude.fromLengthUnit(altValue, this.altitudeUnit, AltitudeReference.MSL);
        newWp.wpAlt.isminalt = this.editWpForm.get('isminmaxalt').value.includes('min');
        newWp.wpAlt.ismaxalt = this.editWpForm.get('isminmaxalt').value.includes('max');
        newWp.wpAlt.isaltatlegstart = this.editWpForm.get('isaltatlegstart').value === 'true';

        this.onSaveClick.emit([this.editWaypoint, newWp]);
    }


    protected onCancelClicked() {
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
                (editWaypoint && editWaypoint.wpAlt.alt) ? Math.round(editWaypoint.wpAlt.alt.getHeightAmsl().getValue(this.altitudeUnit)) : '',
                [Validators.maxLength(5), Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(99999)]],
            'isminmaxalt': [
                editWaypoint ? [editWaypoint.wpAlt.isminalt ? 'min' : '', editWaypoint.wpAlt.ismaxalt ? 'max' : ''] : []],
            'isaltatlegstart': [
                (editWaypoint && editWaypoint.wpAlt.isaltatlegstart) ? 'true' : 'false'],
            'remark': [
                editWaypoint ? editWaypoint.remark : '',
                Validators.maxLength(50)],
            'supp_info': [
                editWaypoint ? editWaypoint.supp_info : '',
                Validators.maxLength(255)]
        });
    }
}
