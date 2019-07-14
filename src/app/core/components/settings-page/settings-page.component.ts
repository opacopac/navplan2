import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../message/services/message.service';
import {MapbaselayerType} from '../../../ol-map/domain/ol-baselayer-factory';
import {Angle} from '../../../geo-math/domain/quantities/angle';
import {Length} from '../../../geo-math/domain/quantities/length';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
    settingsForm: FormGroup;
    MapbaselayerType: typeof MapbaselayerType = MapbaselayerType;

    constructor(private messageService: MessageService) {
    }


    ngOnInit() {
        this.initFormValues();
    }


    onSubmit() {
        if (this.settingsForm.valid) {
            this.updateSettings();
            this.messageService.showSuccessMessage('Settings successfully saved!');
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
        /*
        this.settingsForm = new FormGroup({
            'variationDeg': new FormControl(
                this.session.settings.variation.deg,
                [ Validators.required, Validators.min(-180), Validators.max(180) ]),
            'maxTrafficAltitudeFt' : new FormControl(
                this.session.settings.maxTrafficAltitude.ft,
                [ Validators.required, Validators.min(0) ]),
            'baseMapType': new FormControl(this.session.map.baseMapType, [ Validators.required ])
        });
        */
    }


    private updateSettings() {
        /*
        const formValues = this.settingsForm.value;
        this.session.settings.variation = new Angle(formValues.variationDeg as number, AngleUnit.DEG);
        this.session.settings.maxTrafficAltitude = new Length(formValues.maxTrafficAltitudeFt as number, LengthUnit.FT);
        this.session.map.baseMapType = MapbaselayerType[MapbaselayerType[formValues.baseMapType]];
        */
    }
}
