import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../services/session/session.service';
import {MessageService} from '../../services/utils/message.service';
import {Globalsettings, Sessioncontext} from '../../model/sessioncontext';
import {MapbaselayerType} from '../../model/ol-model/mapbaselayer-factory';
import {AngleUnit, UnitconversionService} from '../../services/utils/unitconversion.service';
import {Angle} from '../../model/units/angle';
import {Altitude} from '../../model/altitude';


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
            this.session.settings = this.getFormValues();
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
                this.session.settings.maxTrafficAltitude.getInFt(),
                [ Validators.required, Validators.min(0) ]),
            'baseMapType': new FormControl(this.session.map.baseMapType, [ Validators.required ])
        });
    }


    private getFormValues(): Globalsettings {
        const formValues = this.settingsForm.value;
        const settings = new Globalsettings(
            new Angle(formValues.variationDeg as number, AngleUnit.DEG),
            new Altitude(UnitconversionService.ft2m(formValues.maxTrafficAltitudeFt as number))
        );
        // settings.baseMapType =  MapbaselayerType[MapbaselayerType[formValues.baseMapType]];

        return settings;
    }
}
