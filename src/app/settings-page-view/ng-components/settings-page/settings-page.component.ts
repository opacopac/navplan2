import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MapBaseLayerType} from '../../../base-map/domain-model/map-base-layer-type';
import {Store} from '@ngrx/store';
import {MessageActions} from '../../../message-state/ngrx/message.actions';
import {Message} from '../../../message/domain-model/message';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
    settingsForm: FormGroup;
    MapbaselayerType: typeof MapBaseLayerType = MapBaseLayerType;

    constructor(private appStore: Store<any>) {
    }


    ngOnInit() {
        this.initFormValues();
    }


    onSubmit() {
        if (this.settingsForm.valid) {
            this.updateSettings();
            this.appStore.dispatch(
                MessageActions.showMessage({ message: Message.success('Settings successfully saved!') })
            );
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
        this.session.settings.maxTrafficAltitude = new Length(formValues.maxTrafficAltitudeFt as number, LengthUnit.FT);
        this.session.map.baseMapType = MapbaselayerType[MapbaselayerType[formValues.baseMapType]];
        */
    }
}
