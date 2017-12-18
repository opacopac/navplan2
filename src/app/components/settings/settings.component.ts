import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { MessageService } from '../../services/message.service';
import { Globalsettings, Sessioncontext } from '../../model/sessioncontext';
import { MapbaselayerType } from '../../model/map/mapbaselayer-factory';


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
            'variationDeg': new FormControl(this.session.settings.variationDeg,[ Validators.required, Validators.min(-180), Validators.max(180) ] ),
            'maxTrafficAltitudeFt' : new FormControl(this.session.settings.maxTrafficAltitudeFt, [ Validators.required, Validators.min(0) ]),
            'baseMapType': new FormControl(this.session.settings.baseMapType, [ Validators.required ])
        });
    }


    private getFormValues(): Globalsettings {
        const formValues = this.settingsForm.value;
        const settings = new Globalsettings();
        settings.variationDeg = formValues.variationDeg as number;
        settings.maxTrafficAltitudeFt = formValues.maxTrafficAltitudeFt as number;
        settings.baseMapType =  MapbaselayerType[MapbaselayerType[formValues.baseMapType]];

        return settings;
    }
}
