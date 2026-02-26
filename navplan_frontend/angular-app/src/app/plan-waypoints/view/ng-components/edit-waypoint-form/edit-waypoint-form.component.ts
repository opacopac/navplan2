import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Waypoint} from '../../../../flightroute/domain/model/waypoint';
import {Altitude} from '../../../../geo-physics/domain/model/geometry/altitude';
import {AltitudeReference} from '../../../../geo-physics/domain/model/geometry/altitude-reference';
import {ButtonColor} from '../../../../common/view/model/button-color';
import {LengthUnit} from '../../../../geo-physics/domain/model/quantities/length-unit';
import {Length} from '../../../../geo-physics/domain/model/quantities/length';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {IconButtonComponent} from '../../../../common/view/ng-components/icon-button/icon-button.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {AltitudeInputComponent} from '../../../../geo-physics/view/ng-components/altitude-input/altitude-input.component';


@Component({
    selector: 'app-edit-waypoint-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        IconButtonComponent,
        AltitudeInputComponent,
    ],
    templateUrl: './edit-waypoint-form.component.html',
    styleUrls: ['./edit-waypoint-form.component.scss']
})
export class EditWaypointFormComponent implements OnInit, OnChanges {
    @Input() editWaypoint: Waypoint;
    @Input() altitudeUnit: LengthUnit;
    @Output() onSaveClick: EventEmitter<[Waypoint, Waypoint]> = new EventEmitter<[Waypoint, Waypoint]>();
    @Output() onCancelClick: EventEmitter<null> = new EventEmitter<null>();

    protected editWpForm: FormGroup;
    protected selectedAltitude: Length | undefined;
    protected readonly ButtonColor = ButtonColor;


    constructor(public formBuilder: FormBuilder) {
    }


    ngOnInit() {
    }


    ngOnChanges() {
        this.initForm(this.editWaypoint);
    }


    protected onAltChanged(length: Length): void {
        this.selectedAltitude = length;
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
        newWp.wpAlt.alt = this.selectedAltitude
            ? Altitude.fromLengthUnit(
                this.selectedAltitude.getValue(this.selectedAltitude.unit),
                this.selectedAltitude.unit, AltitudeReference.MSL
            )
            : undefined;
        newWp.wpAlt.isminalt = this.editWpForm.get('isminmaxalt').value.includes('min');
        newWp.wpAlt.ismaxalt = this.editWpForm.get('isminmaxalt').value.includes('max');
        newWp.wpAlt.isaltatlegstart = this.editWpForm.get('isaltatlegstart').value === 'true';

        this.onSaveClick.emit([this.editWaypoint, newWp]);
    }


    protected onCancelClicked() {
        this.onCancelClick.emit();
    }


    private initForm(editWaypoint: Waypoint) {
        this.selectedAltitude = (editWaypoint && editWaypoint.wpAlt.alt)
            ? editWaypoint.wpAlt.alt.getHeightAmsl()
            : undefined;
        this.editWpForm = this.formBuilder.group({
            'checkpoint': [
                editWaypoint ? editWaypoint.checkpoint : '', [
                    Validators.required,
                    Validators.maxLength(30)
                ]
            ],
            'freq': [
                editWaypoint ? editWaypoint.freq : '',
                Validators.maxLength(7),
            ],
            'callsign': [
                editWaypoint ? editWaypoint.callsign : '',
                Validators.maxLength(10)
            ],
            'isminmaxalt': [
                editWaypoint ? [editWaypoint.wpAlt.isminalt ? 'min' : '', editWaypoint.wpAlt.ismaxalt ? 'max' : ''] : []
            ],
            'isaltatlegstart': [
                (editWaypoint && editWaypoint.wpAlt.isaltatlegstart) ? 'true' : 'false'
            ],
            'remark': [
                editWaypoint ? editWaypoint.remark : '',
                Validators.maxLength(50)
            ],
            'supp_info': [
                editWaypoint ? editWaypoint.supp_info : '',
                Validators.maxLength(255)
            ]
        });
    }
}
