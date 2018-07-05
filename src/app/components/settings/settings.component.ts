import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../core/services/session/session.service';
import {MessageService} from '../../core/services/utils/message.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {MapbaselayerType} from '../../model/ol-model/mapbaselayer-factory';
import {AngleUnit, LengthUnit} from '../../core/services/utils/unitconversion.service';
import {Angle} from '../../model/quantities/angle';
import {Altitude} from '../../model/quantities/altitude';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    session: Sessioncontext;
    settingsForm: FormGroup;
    MapbaselayerType: typeof MapbaselayerType = MapbaselayerType;

    constructor(
        private sessionService: SessionService,
        private messageService: MessageService) {
        this.session = sessionService.getSessionContext();
    }


    ngOnInit() {
        this.initFormValues();
    }


    onSubmit() {
        if (this.settingsForm.valid) {
            this.updateSettings();
            this.messageService.writeSuccessMessage('Settings successfully saved!');
        }
    }


    onCancelClicked() {
        this.initFormValues();
    }


    getBsValidClass(ctrlName: string): string {
        const ctrl = this.settingsForm.controls[ctrlName];
        if (!ctrl.dirty) {
            return '';
        } else if (ctrl.valid) {
            return 'is-valid';
        } else {
            return 'is-invalid';
        }
    }


    private initFormValues() {
        this.settingsForm = new FormGroup({
            'variationDeg': new FormControl(
                this.session.settings.variation.deg,
                [ Validators.required, Validators.min(-180), Validators.max(180) ]),
            'maxTrafficAltitudeFt' : new FormControl(
                this.session.settings.maxTrafficAltitude.ft,
                [ Validators.required, Validators.min(0) ]),
            'baseMapType': new FormControl(this.session.map.baseMapType, [ Validators.required ])
        });
    }


    private updateSettings() {
        const formValues = this.settingsForm.value;
        this.session.settings.variation = new Angle(formValues.variationDeg as number, AngleUnit.DEG);
        this.session.settings.maxTrafficAltitude = new Altitude(formValues.maxTrafficAltitudeFt as number, LengthUnit.FT);
        this.session.map.baseMapType = MapbaselayerType[MapbaselayerType[formValues.baseMapType]];
    }
}
